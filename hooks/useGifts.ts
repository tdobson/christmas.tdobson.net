'use client';
import { useQuery } from '@tanstack/react-query';

export interface GiftWithClaim {
  id: string;
  name: string;
  short_description: string | null;
  long_description: string | null;
  icon: string | null;
  url: string | null;
  price: number | null;
  price_indicator: string | null;
  category_key: string;
  allow_multiple: boolean;
  isClaimed?: boolean;
  claimCount?: number;
}

export function useGifts(recipient: string) {
  return useQuery({
    queryKey: ['gifts', recipient],
    queryFn: async (): Promise<GiftWithClaim[]> => {
      const res = await fetch(`/api/gifts?recipient=${recipient}`);
      if (!res.ok) throw new Error('Failed to fetch gifts');
      const data = await res.json();
      return data.gifts;
    },
    refetchInterval: 10_000,
    staleTime: 5_000,
  });
}
