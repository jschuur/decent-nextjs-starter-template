import { env } from "@shared/config/env";
import "dotenv/config";

import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./src/lib/shared/services/db/schema",
  out: "./src/lib/shared/services/db/migrations",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
};

export default config;
