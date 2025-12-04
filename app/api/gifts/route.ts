import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { Gift, Category, GiftWithClaimStatus, ApiGiftsResponse, ApiErrorResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recipient = searchParams.get('recipient');

    if (!recipient) {
      return NextResponse.json<ApiErrorResponse>(
        { error: 'Missing recipient parameter' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Get recipient ID
    const recipientResult = await db
      .prepare('SELECT id FROM recipients WHERE slug = ?')
      .bind(recipient)
      .first<{ id: string }>();

    if (!recipientResult) {
      return NextResponse.json<ApiErrorResponse>(
        { error: 'Recipient not found' },
        { status: 404 }
      );
    }

    const recipientId = recipientResult.id;

    // Get gifts for this recipient
    const giftsResult = await db
      .prepare('SELECT * FROM gifts WHERE recipient_id = ? ORDER BY created_at ASC')
      .bind(recipientId)
      .all<Gift>();

    const gifts = giftsResult.results || [];

    // Get claim counts for all gifts
    const giftIds = gifts.map(g => g.id);
    const claimsResult = await db
      .prepare(
        `SELECT gift_id, COUNT(*) as count FROM claims WHERE gift_id IN (${giftIds.map(() => '?').join(',')}) GROUP BY gift_id`
      )
      .bind(...giftIds)
      .all<{ gift_id: string; count: number }>();

    const claimCounts = new Map<string, number>();
    (claimsResult.results || []).forEach(row => {
      claimCounts.set(row.gift_id, row.count);
    });

    // Add claim status to gifts
    const giftsWithStatus: GiftWithClaimStatus[] = gifts.map(gift => {
      const claimCount = claimCounts.get(gift.id) || 0;

      if (gift.allow_multiple === 0) {
        // Single-claim items: include isClaimed boolean
        return {
          ...gift,
          isClaimed: claimCount > 0,
        };
      } else {
        // Multi-claim items: include claimCount
        return {
          ...gift,
          claimCount,
        };
      }
    });

    // Get categories for this recipient
    const categoriesResult = await db
      .prepare('SELECT * FROM categories WHERE recipient_id = ?')
      .bind(recipientId)
      .all<Category>();

    const categories: Record<string, Category> = {};
    (categoriesResult.results || []).forEach(cat => {
      categories[cat.key] = cat;
    });

    const response: ApiGiftsResponse = {
      gifts: giftsWithStatus,
      categories,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching gifts:', error);
    return NextResponse.json<ApiErrorResponse>(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
