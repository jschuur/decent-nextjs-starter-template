import * as Sentry from '@sentry/nextjs';

import { env } from '@/env';

// https://docs.sentry.io/platforms/javascript/guides/nextjs/
Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  debug: env.NEXT_PUBLIC_SENTRY_DEBUG,

  // Disable the session replays;
  // replaysOnErrorSampleRate: 1.0,
  // replaysSessionSampleRate: 0.1,
  //
  // integrations: [
  //   Sentry.replayIntegration({
  //     maskAllText: true,
  //     blockAllMedia: true,
  //   }),
  // ],
});
