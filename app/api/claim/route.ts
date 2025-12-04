import { NextRequest, NextResponse } from 'next/server';
import { v7 as uuidv7 } from 'uuid';
import { getDb } from '@/lib/db';
import { verifyPoW } from '@/lib/pow';
import type { ApiClaimRequest, ApiClaimResponse, ApiErrorResponse, Gift, Challenge } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: ApiClaimRequest = await request.json();
    const { giftId, email, challenge, nonce } = body;

    // Validate input
    if (!giftId || !email || !challenge || !nonce) {
      return NextResponse.json<ApiErrorResponse>(
        { error: 'Missing required fields: giftId, email, challenge, nonce' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiErrorResponse>(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const db = getDb();

    // 1. Verify the PoW solution
    const isValidPoW = await verifyPoW(challenge, nonce);
    if (!isValidPoW) {
      return NextResponse.json<ApiErrorResponse>(
        { error: 'Invalid proof-of-work solution' },
        { status: 403 }
      );
    }

    // 2. Check challenge exists and is unused
    const challengeRecord = await db
      .prepare('SELECT * FROM challenges WHERE challenge = ? AND used = 0')
      .bind(challenge)
      .first<Challenge>();

    if (!challengeRecord) {
      return NextResponse.json<ApiErrorResponse>(
        { error: 'Challenge not found or already used' },
        { status: 403 }
      );
    }

    // 3. Get the gift
    const gift = await db
      .prepare('SELECT * FROM gifts WHERE id = ?')
      .bind(giftId)
      .first<Gift>();

    if (!gift) {
      return NextResponse.json<ApiErrorResponse>(
        { error: 'Gift not found' },
        { status: 404 }
      );
    }

    // 4. For single-claim items, check if already claimed
    if (gift.allow_multiple === 0) {
      const existingClaim = await db
        .prepare('SELECT COUNT(*) as count FROM claims WHERE gift_id = ?')
        .bind(giftId)
        .first<{ count: number }>();

      if (existingClaim && existingClaim.count > 0) {
        return NextResponse.json<ApiClaimResponse>(
          {
            success: false,
            message: 'This gift has already been claimed by someone else.',
          },
          { status: 409 }
        );
      }
    }

    // 5. Create the claim
    const claimId = uuidv7();
    await db
      .prepare('INSERT INTO claims (id, gift_id, email) VALUES (?, ?, ?)')
      .bind(claimId, giftId, email)
      .run();

    // 6. Mark the challenge as used
    await db
      .prepare('UPDATE challenges SET used = 1 WHERE challenge = ?')
      .bind(challenge)
      .run();

    const response: ApiClaimResponse = {
      success: true,
      message: 'Gift claimed successfully!',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error claiming gift:', error);
    return NextResponse.json<ApiErrorResponse>(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
