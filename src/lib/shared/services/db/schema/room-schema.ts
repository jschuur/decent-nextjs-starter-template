import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "./auth-schema";

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
export type InsertRoomModel = Readonly<z.infer<typeof insertRoomSchema>>;

export const roomSchema = createSelectSchema(rooms);
export type RoomRoom = Readonly<z.infer<typeof roomSchema>>;
