import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./auth-schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const rooms = sqliteTable("room", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const insertRoomSchema = createInsertSchema(rooms);
export type InsertRoom = Readonly<z.infer<typeof insertRoomSchema>>;

export const selectRoomSchema = createSelectSchema(rooms);
export type SelectRoom = Readonly<z.infer<typeof selectRoomSchema>>;
