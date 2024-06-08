import Database from 'better-sqlite3';
import { boolean } from 'boolean';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database(process.env.DATABASE_URL as string);

import * as schema from '@/db/schema';

export const db = drizzle(sqlite, { schema, logger: boolean(process.env.DATABASE_DEBUG) });
