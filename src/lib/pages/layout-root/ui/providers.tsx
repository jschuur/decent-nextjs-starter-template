"use client";

import { env } from "@shared/config/env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { FC,ReactNode, useState } from "react";

import { defaultTanStackQueryOptions } from "@/lib/config";

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  // TanStack Query client for the client
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: defaultTanStackQueryOptions }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <TooltipProvider>
          {children}

          {env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </TooltipProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};
