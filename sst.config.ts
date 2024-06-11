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
      environment: {
        SST_STAGE: $app.stage,
        ...environment,
      },
    };

    if (!$dev) {
      if (env.SITE_DOMAIN) config.domain = env.SITE_DOMAIN;
      if (env.WARM > 0) config.warm = env.WARM;
    }

    new sst.aws.Nextjs('Site', config);
  },
});
