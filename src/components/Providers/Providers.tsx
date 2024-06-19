'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useSetAtom } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { env } from '@/env';
import { defaultTanStackQueryOptions } from '@/lib/config';
import { queryClientAtom } from '@/stores/jotai';

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
  const setQueryClient = useSetAtom(queryClientAtom);

  useEffect(() => {
    if (queryClient) setQueryClient(queryClient);
  }, [queryClient, setQueryClient]);

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
