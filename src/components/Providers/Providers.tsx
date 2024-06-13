'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useState } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { env } from '@/env';
import { defaultTanStackQueryOptions } from '@/lib/config';

type Props = {
  children: ReactNode;
};

// misc client side providers
// includes anything that might need access to Auth.js session, React Query or other state data
export default function Providers({ children }: Props) {
  // TanStack Query client for the client
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: defaultTanStackQueryOptions })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <TooltipProvider>
          {children}

          {env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS && <ReactQueryDevtools initialIsOpen={false} />}
        </TooltipProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
