import type { D1Database } from '@cloudflare/workers-types';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export function getDb(): D1Database {
  const { env } = getCloudflareContext();
  const db = (env as any).DB as D1Database;
  if (!db) {
    throw new Error('D1 database binding not found. Check wrangler.toml configuration.');
  }
  return db;
}
