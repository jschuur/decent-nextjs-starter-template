import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from '@/db/schema';
import { env } from '@/env';

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema,
  logger: env.DATABASE_DEBUG,
});
