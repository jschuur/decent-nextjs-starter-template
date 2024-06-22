'use server';

import { asc, count, eq } from 'drizzle-orm';

import { adminProtectedAction } from '@/auth/auth';
import { db } from '@/db/db';
import { stackItems, users } from '@/db/schema';

import { StackItem, StackItemInsert } from '@/lib/types';

export async function getStackItems() {
  return db.select().from(stackItems).orderBy(asc(stackItems.position));
}

type UpdateStackItemParams = {
  id: string;
  data: Partial<StackItem>;
};
export const updateStackItem = adminProtectedAction(({ id, data }: UpdateStackItemParams) =>
  db.update(stackItems).set(data).where(eq(stackItems.id, id)).returning()
);

export const createStackItem = adminProtectedAction((data: StackItemInsert) =>
  db.insert(stackItems).values(data).returning()
);

export const deleteStackItem = adminProtectedAction(({ id }: StackItem) =>
  db.delete(stackItems).where(eq(stackItems.id, id)).returning()
);

export const userCount = async () => {
  const res = await db.select({ count: count() }).from(users);

  return res[0].count;
};
