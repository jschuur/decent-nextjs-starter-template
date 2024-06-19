'use server';

import { asc, eq } from 'drizzle-orm';

import { db } from '@/db/db';
import { stackItems } from '@/db/schema';

import { StackItem, StackItemInsert } from '@/lib/types';

export async function getStackItems() {
  return db.select().from(stackItems).orderBy(asc(stackItems.position));
}

type UpdateStackItemParams = {
  id: string;
  data: Partial<StackItem>;
};
export async function updateStackItem({ id, data }: UpdateStackItemParams) {
  return db.update(stackItems).set(data).where(eq(stackItems.id, id)).returning();
}

export async function createStackItem(data: StackItemInsert) {
  return db.insert(stackItems).values(data).returning();
}

export async function deleteStackItem({ id }: StackItem) {
  return db.delete(stackItems).where(eq(stackItems.id, id)).returning();
}
