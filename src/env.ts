import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    // TODO: transform to boolean
    DATABASE_DEBUG: z.string().optional().default(''),
    SITE_DOMAIN: z.string().optional().default(''),
    WARM: z.number().optional().default(0),
    AUTH_SECRET: z.string().optional().default(''),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    // TODO: transform to boolean
    AUTH_DEBUG: z.string().optional().default(''),
  },
  client: {
    // NEXT_PUBLIC_: z.string().min(1),
  },

  // client side variables for Next.js 14+
  experimental__runtimeEnv: {
    //   NEXT_PUBLIC_: process.env.NEXT_PUBLIC_,
  },
});
