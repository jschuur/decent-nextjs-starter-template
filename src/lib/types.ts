import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { userRoles } from '@/auth/roles';
import { stackItems } from '@/db/schema';

const stackItemSchemaOptions = {
  createdAt: z.coerce.date(),
  tags: z.array(z.string()),
};

export const stackItemSchema = createSelectSchema(stackItems, stackItemSchemaOptions);
export type StackItem = z.infer<typeof stackItemSchema>;
export const insertStackItem = createInsertSchema(stackItems, stackItemSchemaOptions);
export type StackItemInsert = z.infer<typeof insertStackItem>;

export type UserRole = (typeof userRoles)[number];
