/// <reference path="./.sst/platform/config.d.ts" />
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
    const config: sst.aws.NextjsArgs = {
      environment: {
        SST_STAGE: $app.stage,
        DATABASE_URL: env.DATABASE_URL,
        DATABASE_DEBUG: env.DATABASE_DEBUG,
      },
    };

    if (!$dev) {
      if (env.DATABASE_AUTH_TOKEN)
        config.environment = {
          ...config.environment,
          DATABASE_AUTH_TOKEN: env.DATABASE_AUTH_TOKEN,
        };

      if (env.SITE_DOMAIN) config.domain = env.SITE_DOMAIN;
      if (env.WARM > 0) config.warm = env.WARM;
    }

    new sst.aws.Nextjs('Site', config);
  },
});
