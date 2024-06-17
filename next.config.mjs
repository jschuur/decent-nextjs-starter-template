import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */

const nextConfig = {};

// https://github.com/getsentry/sentry-webpack-plugin#options
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
});
