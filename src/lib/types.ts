import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { stackItems } from '@/db/schema';

const stackItemSchemaOptions = {
  createdAt: z.coerce.date(),
};

export const stackItemSchema = createSelectSchema(stackItems, stackItemSchemaOptions);
export type StackItem = z.infer<typeof stackItemSchema>;
export const insertStackItem = createInsertSchema(stackItems, stackItemSchemaOptions);
export type StackItemInsert = z.infer<typeof insertStackItem>;
