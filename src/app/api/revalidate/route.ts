import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import prettyMilliseconds from 'pretty-ms';
import { z } from 'zod';

import { env } from '@/env';
import { getErrorMessage, invalidateCloudFrontPaths, zParsedBoolean } from '@/lib/utils';

const paramsSchema = z.object({
  secret: z.string().refine((val) => val === env.REVALIDATE_SECRET, {
    message: 'The secret field is either missing or incorrect.',
  }),
  path: z
    .string()
    .optional()
    .transform((val) => val?.split(',')),
  tag: z.string().optional(),
  invalidatePath: z
    .string()
    .optional()
    .transform((val) => val?.split(',')),
  invalidate: zParsedBoolean.default('true'),
  type: z.enum(['layout', 'page']).optional(),
});

export async function GET(request: Request) {
  const startTime = new Date();

  try {
    const { searchParams } = new URL(request.url);
    const params = paramsSchema.parse(Object.fromEntries(searchParams));

    const { path: paths, tag, invalidatePath, type, invalidate } = params;

    if (paths) {
      for (const path of paths) revalidatePath(path, type);
    } else if (tag) {
      revalidateTag(tag);
    }

    // since we can't do a Cloudfront invalidate by Next.js tag, also use an optional invalidatePath list
    if (invalidate) await invalidateCloudFrontPaths(invalidatePath || paths || []);

    return NextResponse.json(
      {
        message: 'success',
        elapsedTime: prettyMilliseconds(new Date().getTime() - startTime.getTime()),
        params: { ...params, secret: '***' },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Error revalidating: ${getErrorMessage(err)}` },
      { status: 500 }
    );
  }
}
