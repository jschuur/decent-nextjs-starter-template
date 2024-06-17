import { createEnv } from '@t3-oss/env-nextjs';
import { boolean } from 'boolean';
import { z } from 'zod';

const zParsedBoolean = z
  .string()
  .transform((v) => boolean(v))
  .optional()
  .default('false');

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    DATABASE_DEBUG: zParsedBoolean,
    SITE_DOMAIN: z.string().optional().default(''),
    WARM: z.number().optional().default(0),
    AUTH_SECRET: z.string().optional().default(''),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_DEBUG: zParsedBoolean,
    SENTRY_DSN: z.string().optional(),
    SENTRY_DEBUG: zParsedBoolean,
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional().default(''),
    NEXT_PUBLIC_REACT_QUERY_DEVTOOLS: zParsedBoolean,
    // sst.config.ts will set these based on SENTRY_* variables, so no need to
    // duplicate them in the .env files
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DEBUG: zParsedBoolean,
  },

  // client side variables for Next.js 14+
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_REACT_QUERY_DEVTOOLS: process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_DEBUG: process.env.NEXT_PUBLIC_SENTRY_DEBUG,
  },
});
