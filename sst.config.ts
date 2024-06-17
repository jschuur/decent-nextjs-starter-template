/// <reference path="./.sst/platform/config.d.ts" />
import dotenv from "dotenv";

import { env } from "./src/lib/shared/config/env";

export default $config({
  app(input) {
    return {
      name: "decent-nextjs-starter-template",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const envFile = $dev ? ".env" : `.env.${$app.stage}`;
    const { parsed: environment } = dotenv.config({ path: envFile });

    const config: sst.aws.NextjsArgs = {
      environment: {
        SST_STAGE: $app.stage,
        ...environment,
        // these are picked up via their SENTRY_* versions, so we don't need to explicitly list them
        NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN || '',
        NEXT_PUBLIC_SENTRY_DEBUG: process.env.SENTRY_DEBUG || '',
      },
    };

    if (!$dev) {
      if (env.SITE_DOMAIN) config.domain = env.SITE_DOMAIN;
      if (env.WARM > 0) config.warm = env.WARM;
    }

    new sst.aws.Nextjs("Site", config);
  },
});
