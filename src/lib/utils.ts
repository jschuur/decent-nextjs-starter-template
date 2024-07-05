import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { boolean } from 'boolean';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

import { env } from '@/env';

const cloudFront = new CloudFrontClient({});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) return fromError(error).toString();

  if (error instanceof Error) return error.message;

  return String(error);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDateShort(date: Date | string | undefined) {
  return date && format(new Date(date), 'LLL do, yyyy');
}

export const zParsedBoolean = z.string().transform((v) => boolean(v));

export function siteUrl() {
  if (env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  } else if (env.SITE_HOSTNAME) {
    return `${env.SITE_PROTOCOL || 'https'}://${process.env.SITE_HOSTNAME}`;
  } else {
    return 'http://localhost:3000';
  }
}

// https://open-next.js.org/v2/common_issues/isr#on-demand-revalidationimport

// check https://github.com/sst/ion/issues/135 if still needed
export async function invalidateCloudFrontPaths(paths: string[]) {
  if (env.CLOUDFRONT_DISTRIBUTION_ID)
    await cloudFront.send(
      new CreateInvalidationCommand({
        // Set CloudFront distribution ID here
        DistributionId: env.CLOUDFRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: paths.length,
            Items: paths,
          },
        },
      })
    );
  else console.warn('No CloudFront distribution ID found. Skipping invalidation.');
}
