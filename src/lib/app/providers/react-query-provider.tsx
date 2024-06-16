import {
  HydrationBoundary,
  QueryClient,
  defaultShouldDehydrateQuery,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

import { defaultTanStackQueryOptions } from "@/lib/config";

type Props = {
  children: ReactNode;
};
export default async function ReactQueryProvider({ children }: Props) {
  // TanStack Query client for the server to prefetch data
  const queryClient = new QueryClient({
    defaultOptions: {
      ...defaultTanStackQueryOptions,
      dehydrate: {
        // includes pending queries during dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });

  // prefetch data at build time https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#prefetching-and-dehydrating-data
  // await queryClient.prefetchQuery({
  //   queryKey: ["stackItems"],
  //   queryFn: getStackItems,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
