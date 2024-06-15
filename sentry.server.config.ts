import * as Sentry from '@sentry/nextjs';

import { env } from '@/env';

// https://docs.sentry.io/platforms/javascript/guides/nextjs/
Sentry.init({
  dsn: env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  debug: env.SENTRY_DEBUG,
});
