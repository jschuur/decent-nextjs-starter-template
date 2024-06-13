'use server';

import { asc } from 'drizzle-orm';

import { db } from '@/db/db';
import { stackItems } from '@/db/schema';

export async function getStackItems() {
  return db.select().from(stackItems).orderBy(asc(stackItems.position));
}
