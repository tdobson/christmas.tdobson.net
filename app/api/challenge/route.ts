import { NextResponse } from 'next/server';
import { v7 as uuidv7 } from 'uuid';
import { getDb } from '@/lib/db';
import { generateChallenge } from '@/lib/pow';
import type { ApiChallengeResponse, ApiErrorResponse } from '@/lib/types';

const DIFFICULTY = 4; // Number of leading zero hex characters

export async function GET() {
  try {
    const db = getDb();

    // Generate a new challenge
    const challenge = generateChallenge();
    const id = uuidv7();

    // Store it in the database
    await db
      .prepare('INSERT INTO challenges (id, challenge, used) VALUES (?, ?, 0)')
      .bind(id, challenge)
      .run();

    // Clean up old challenges (older than 1 hour)
    await db
      .prepare("DELETE FROM challenges WHERE created_at < datetime('now', '-1 hour')")
      .run();

    const response: ApiChallengeResponse = {
      challenge,
      difficulty: DIFFICULTY,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating challenge:', error);
    return NextResponse.json<ApiErrorResponse>(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
