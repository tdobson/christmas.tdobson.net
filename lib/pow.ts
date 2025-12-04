const DIFFICULTY = 4; // Number of leading zero hex characters

export function generateChallenge(): string {
  return crypto.randomUUID();
}

export async function verifyPoW(
  challenge: string,
  nonce: string,
  difficulty: number = DIFFICULTY
): Promise<boolean> {
  const data = new TextEncoder().encode(challenge + nonce);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex.startsWith('0'.repeat(difficulty));
}
