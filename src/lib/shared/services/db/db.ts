import { createClient } from "@libsql/client/web";
import { env } from "@shared/config/env";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema,
  logger: env.DATABASE_DEBUG,
});

export type Db = typeof db;
