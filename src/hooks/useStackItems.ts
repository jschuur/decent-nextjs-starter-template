import { useQuery } from '@tanstack/react-query';

import { getStackItems } from '@/db/queries';

// Basic custom hook to later abstract away custom logic
export default function useStackItems() {
  return useQuery({
    queryKey: ['stackItems'],
    queryFn: () => getStackItems(),
  });
}
