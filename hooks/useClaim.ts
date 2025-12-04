'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Client-side PoW solver
async function solveChallenge(challenge: string, difficulty: number): Promise<string> {
  let nonce = 0;
  const target = '0'.repeat(difficulty);

  while (true) {
    const data = new TextEncoder().encode(challenge + nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (hashHex.startsWith(target)) {
      return nonce.toString();
    }
    nonce++;

    // Yield to UI every 1000 iterations
    if (nonce % 1000 === 0) {
      await new Promise(r => setTimeout(r, 0));
    }
  }
}

export function useClaim(recipient: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ giftId, email }: { giftId: string; email: string }) => {
      // Get challenge
      const challengeRes = await fetch('/api/challenge');
      if (!challengeRes.ok) throw new Error('Failed to get challenge');
      const { challenge, difficulty } = await challengeRes.json();

      // Solve PoW
      const nonce = await solveChallenge(challenge, difficulty);

      // Submit claim
      const claimRes = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftId, email, challenge, nonce }),
      });

      if (!claimRes.ok) {
        const error = await claimRes.json();
        throw new Error(error.message || 'Failed to claim');
      }

      return claimRes.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts', recipient] });
    },
  });
}
