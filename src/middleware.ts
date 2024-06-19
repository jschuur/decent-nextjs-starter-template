import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@/auth/auth';

export const middleware = auth(function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/monitoring')) {
    const orgId = request.nextUrl.searchParams.get('o');
    const projectId = request.nextUrl.searchParams.get('p');

    return NextResponse.rewrite(
      new URL(`https://o${orgId}.ingest.sentry.io/api/${projectId}/envelope/?hsts=0`)
    );
  }
});
