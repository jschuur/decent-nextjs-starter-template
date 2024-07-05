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
    SITE_HOSTNAME: z.string().optional().default(''),
    AUTH_SECRET: z.string().optional().default(''),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_DEBUG: zParsedBoolean,
    SENTRY_DSN: z.string().optional(),
    SENTRY_DEBUG: zParsedBoolean,
    REVALIDATE_SECRET: z.string().optional().default(''),
    // only for Vercel deployments
    VERCEL_URL: z.string().optional(),
    SITE_PROTOCOL: z.enum(['http', 'https']).optional().default('https'),
    // for deploying via SST if you're using on demand ISR
    CLOUDFRONT_DISTRIBUTION_ID: z.string().optional(),
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
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DEBUG,
    NEXT_PUBLIC_SENTRY_DEBUG: process.env.NEXT_PUBLIC_SENTRY_DEBUG || process.env.SENTRY_DEBUG,
  },
});
