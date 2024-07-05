/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from 'dotenv';

import { env } from './src/env';

export default $config({
  app(input) {
    return {
      name: 'decent-nextjs-starter-template',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const envFile = $dev ? '.env' : `.env.${$app.stage}`;
    const { parsed: environment } = dotenv.config({ path: envFile });

    const config: sst.aws.NextjsArgs = {
      openNextVersion: '3.0.6',
      environment: {
        SST_STAGE: $app.stage,
        ...environment,
        // these are picked up via their SENTRY_* versions, so we don't need to explicitly list them
        NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN || '',
        NEXT_PUBLIC_SENTRY_DEBUG: process.env.SENTRY_DEBUG || '',
      },
    };

    if (!$dev) {
      if (env.SITE_HOSTNAME) config.domain = env.SITE_HOSTNAME;
      if (process.env.WARM) config.warm = parseInt(process.env.WARM || '0', 10);
      // Check https://github.com/sst/ion/issues/632 if this is still needed
      if (env.CLOUDFRONT_DISTRIBUTION_ID)
        config.permissions = [
          {
            actions: ['cloudfront:CreateInvalidation'],
            resources: [
              `arn:aws:cloudfront::*:distribution/${env.CLOUDFRONT_DISTRIBUTION_ID || '*'}`,
            ],
          },
        ];
    }

    new sst.aws.Nextjs('Site', config);
  },
});
