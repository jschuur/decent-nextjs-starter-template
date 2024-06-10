import { env } from '@/env';
import 'dotenv/config';

import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/db/schema.ts',
  out: './db/migrations',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DATABASE_URL as string,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
};

export default config;
