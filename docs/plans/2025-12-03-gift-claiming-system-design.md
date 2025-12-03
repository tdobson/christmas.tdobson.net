# Gift Claiming System Design

**Date:** 2025-12-03
**Status:** Approved for implementation

## Overview

Migrate the Christmas gift list website from static Cloudflare Pages to dynamic Cloudflare Workers + D1, adding a gift claiming system to prevent duplicate purchases.

## Key Decisions

| Decision | Choice |
|----------|--------|
| Claiming identity | Email only |
| Claim visibility | Status public, email admin-only |
| Anti-spam | Proof-of-work (client-side computation) |
| Quantity model | Boolean `allow_multiple` (false = one claim, true = unlimited) |
| Admin access | Minimal - secret URL if needed, not priority |
| Unclaiming | None - confirmation dialog prevents mistakes |
| Architecture | Migrate to Next.js App Router |
| Data seeding | Migration script from existing JSON files |
| Data fetching | React Query with 10-second polling |

## Architecture

### Deployment Stack

Based on reference project `/home/tdobson/dev/depreciated.projects/bumps-babies-and-toddlers`:

- **Runtime:** Cloudflare Workers via `@opennextjs/cloudflare`
- **Database:** Cloudflare D1
- **Framework:** Next.js 15.x App Router
- **UI:** Mantine 8.x (upgrade from 7.x)
- **Data fetching:** React Query (`@tanstack/react-query`)

### Directory Structure

```
app/
  layout.tsx              # Root layout with Mantine + React Query provider
  page.tsx                # Home/landing
  tim/page.tsx            # Tim's gift list
  jen/page.tsx            # Jen's gift list
  james/page.tsx          # James's gift list
  schedule/page.tsx       # Schedule page (read-only)
  api/
    gifts/route.ts        # GET gifts + claim status
    challenge/route.ts    # GET fresh PoW challenge
    claim/route.ts        # POST to claim a gift
components/
  GiftList/
  GiftCard/
  ClaimModal/
  Layout/
lib/
  db.ts                   # D1 access via getCloudflareContext()
  pow.ts                  # Proof-of-work generation/verification
  types.ts                # TypeScript interfaces
hooks/
  useGifts.ts             # React Query hook with polling
migrations/
  0001_initial_schema.sql
scripts/
  seed-database.ts        # Convert JSON to SQL inserts
config/                   # Existing JSON files (seed source)
wrangler.toml
open-next.config.ts
```

## Dependencies

### Production Dependencies

```json
{
  "@mantine/core": "8.2.1",
  "@mantine/hooks": "8.2.1",
  "@tabler/icons-react": "^3.34.0",
  "@tanstack/react-query": "^5.x",
  "next": "15.3.3",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "uuid": "^10.0.0",
  "date-fns": "^4.1.0"
}
```

### Dev Dependencies

```json
{
  "@cloudflare/workers-types": "^4.20241127.0",
  "@opennextjs/cloudflare": "^1.13.0",
  "@types/node": "^22.13.11",
  "@types/react": "19.1.8",
  "@types/uuid": "^10.0.0",
  "postcss": "^8.5.5",
  "postcss-preset-mantine": "1.17.0",
  "postcss-simple-vars": "^7.0.1",
  "tsx": "^4.19.2",
  "typescript": "5.8.3",
  "wrangler": "^4.49.0"
}
```

## Configuration Files

### wrangler.toml

```toml
name = "christmas-tdobson-net"
main = ".open-next/worker.js"
compatibility_date = "2025-04-01"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = ".open-next/assets"
binding = "ASSETS"

[[d1_databases]]
binding = "DB"
database_name = "christmas-gifts-prod"
database_id = "<to-be-created>"
migrations_dir = "migrations"

[env.dev]
[[env.dev.d1_databases]]
binding = "DB"
database_name = "christmas-gifts-dev"
database_id = "<to-be-created>"
```

### open-next.config.ts

```typescript
import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
  edgeExternals: ['node:crypto'],
  middleware: {
    external: true,
    override: {
      wrapper: 'cloudflare-edge',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
};

export default config;
```

### next.config.mjs

```javascript
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
});
```

## Database Schema

### migrations/0001_initial_schema.sql

```sql
-- Gift recipients
CREATE TABLE recipients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Gift categories per recipient
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  key TEXT NOT NULL,
  title TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

-- Gift items
CREATE TABLE gifts (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  category_key TEXT NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  icon TEXT,
  url TEXT,
  price INTEGER,
  price_indicator TEXT,
  allow_multiple INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

-- Claims on gifts
CREATE TABLE claims (
  id TEXT PRIMARY KEY,
  gift_id TEXT NOT NULL,
  email TEXT NOT NULL,
  claimed_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (gift_id) REFERENCES gifts(id)
);

-- PoW challenges (short-lived)
CREATE TABLE challenges (
  id TEXT PRIMARY KEY,
  challenge TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  used INTEGER DEFAULT 0
);

-- Do-not-buy lists
CREATE TABLE do_not_buy (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  item TEXT NOT NULL,
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

-- Indexes
CREATE INDEX idx_gifts_recipient ON gifts(recipient_id);
CREATE INDEX idx_claims_gift ON claims(gift_id);
CREATE INDEX idx_challenges_created ON challenges(created_at);
```

## Key Implementation Details

### D1 Database Access (lib/db.ts)

```typescript
import type { D1Database } from '@cloudflare/workers-types';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export function getDb(): D1Database {
  const { env } = getCloudflareContext();
  const db = (env as any).DB as D1Database;
  if (!db) {
    throw new Error('D1 database binding not found');
  }
  return db;
}
```

### Proof-of-Work (lib/pow.ts)

```typescript
// Difficulty: number of leading zero hex characters required
const DIFFICULTY = 4; // ~65k iterations, 2-5 seconds

export async function generateChallenge(): Promise<string> {
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
```

### React Query Hook (hooks/useGifts.ts)

```typescript
import { useQuery } from '@tanstack/react-query';

export function useGifts(recipient: string) {
  return useQuery({
    queryKey: ['gifts', recipient],
    queryFn: () =>
      fetch(`/api/gifts?recipient=${recipient}`).then(r => r.json()),
    refetchInterval: 10_000,
    staleTime: 5_000,
  });
}
```

### Claim Flow

1. User clicks "I'll get this"
2. Modal: "Are you sure you want to claim [Gift Name]?"
3. User enters email, clicks Confirm
4. Client: `GET /api/challenge` - fetch fresh challenge
5. Client: Compute PoW (2-5 seconds with spinner)
6. Client: `POST /api/claim` with `{ giftId, email, challenge, nonce }`
7. Server: Verify PoW, check gift available, insert claim
8. Server: Return success or "already claimed" error
9. React Query refetches, UI updates

## npm Scripts

```json
{
  "dev": "next dev",
  "build": "next build && npx @opennextjs/cloudflare build --skipNextBuild",
  "deploy": "npm run build && wrangler deploy",
  "db:create": "wrangler d1 create christmas-gifts-prod",
  "db:create:dev": "wrangler d1 create christmas-gifts-dev",
  "db:migrate": "wrangler d1 migrations apply christmas-gifts-prod",
  "db:migrate:local": "wrangler d1 migrations apply christmas-gifts-dev --local --env=dev",
  "db:seed": "tsx scripts/seed-database.ts > data/seed.sql && wrangler d1 execute christmas-gifts-prod --file=data/seed.sql",
  "db:seed:local": "tsx scripts/seed-database.ts > data/seed.sql && wrangler d1 execute christmas-gifts-dev --local --env=dev --file=data/seed.sql"
}
```

## Migration from Existing Codebase

### What Changes

| From | To |
|------|-----|
| `pages/` directory | `app/` directory |
| Static JSON imports | D1 database queries |
| `wrangler pages deploy` | `wrangler deploy` (Workers) |
| Mantine 7.13.5 | Mantine 8.2.1 |
| React 18.3.1 | React 19.1.0 |
| Next.js 15.0.1 | Next.js 15.3.3 |

### What Stays

- Mantine components (with version upgrade)
- Tabler icons
- Overall page structure and styling
- JSON config files (as seed source)
- Schedule page (read-only, no claiming)

## Out of Scope

- Unclaim functionality
- Rich admin dashboard
- Email notifications when gifts claimed
- Schedule page claiming
- Gift editing via UI (edit JSON + re-seed)

## Implementation Order

1. Create new branch `feature/gift-claiming`
2. Set up Workers + D1 infrastructure (wrangler.toml, open-next.config.ts)
3. Migrate to App Router directory structure
4. Upgrade dependencies (Mantine 8, React 19, etc.)
5. Implement database schema and seed script
6. Build API routes (gifts, challenge, claim)
7. Add React Query provider and hooks
8. Build ClaimModal component with PoW
9. Update gift list pages to use new data fetching
10. Test locally with `wrangler dev`
11. Deploy and verify
