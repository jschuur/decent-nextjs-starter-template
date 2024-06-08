import 'dotenv/config';

import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined');

const config: Config = {
  schema: './src/db/schema.ts',
  out: './db/migrations',
  // driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
};

export default config;
