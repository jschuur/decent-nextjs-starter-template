'use client';

import { GoogleAnalytics as GoogleAnalyticsScript } from '@next/third-parties/google';

import { env } from '@/env';

export default function GoogleAnalytics() {
  return env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ? (
    <GoogleAnalyticsScript gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
  ) : null;
}
