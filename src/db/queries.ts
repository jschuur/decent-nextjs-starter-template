import { asc } from 'drizzle-orm';

import { db } from '@/db/db';
import { stackItems } from '@/db/schema';

import { StackItem } from '@/lib/types';

export function getStackItems(): Promise<StackItem[]> {
  return db.select().from(stackItems).orderBy(asc(stackItems.position));
}
