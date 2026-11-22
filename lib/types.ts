// Database table types
export interface Recipient {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  recipient_id: string;
  key: string;
  title: string;
  icon: string | null;
  color: string | null;
}

export interface Gift {
  id: string;
  recipient_id: string;
  category_key: string;
  name: string;
  short_description: string | null;
  long_description: string | null;
  icon: string | null;
  url: string | null;
  price: number | null;
  price_indicator: string | null;
  allow_multiple: number;
  hidden: number;
  created_at: string;
}

export interface Claim {
  id: string;
  gift_id: string;
  email: string;
  claimed_at: string;
}

export interface Challenge {
  id: string;
  challenge: string;
  created_at: string;
  used: number;
}

export interface DoNotBuy {
  id: string;
  recipient_id: string;
  item: string;
}

// API response types
export interface GiftWithClaimStatus extends Gift {
  isClaimed?: boolean;
  claimCount?: number;
}

export interface ApiGiftsResponse {
  gifts: GiftWithClaimStatus[];
  categories: Record<string, Category>;
}

export interface ApiChallengeResponse {
  challenge: string;
  difficulty: number;
}

export interface ApiClaimRequest {
  giftId: string;
  email: string;
  challenge: string;
  nonce: string;
}

export interface ApiClaimResponse {
  success: boolean;
  message: string;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
}
