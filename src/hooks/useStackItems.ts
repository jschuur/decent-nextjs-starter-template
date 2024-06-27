import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import {
  createStackItem,
  deleteStackItem,
  getStackItems,
  reorderStackItems,
  updateStackItem,
} from '@/db/queries';
import { queryClientAtom } from '@/stores/jotai';

import { StackItem } from '@/lib/types';

// Basic custom hook to later abstract away custom logic
export default function useStackItems() {
  const queryClient = useAtomValue(queryClientAtom);
  const query = useQuery({
    queryKey: ['stackItems'],
    queryFn: () => getStackItems(),
  });

  const { mutateAsync: reorderExistingStackItems } = useMutation({
    mutationFn: reorderStackItems,
    onMutate: async ({ data }) => {
      let previousStackItems: StackItem[] = [];

      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      if (queryClient) {
        await queryClient.cancelQueries({ queryKey: ['stackItems'] });
        previousStackItems = queryClient.getQueryData<StackItem[]>(['stackItems']) || [];

        // Optimistically update the whole list of stack items
        queryClient.setQueryData(['stackItems'], data);
      } else {
        toast.error('Failed to update stack item: queryClient null');
      }

      return { previousStackItems };
    },
    // Restore the previous stack item list if the mutation fails
    onError: (err, stackItem, context) => {
      if (queryClient && context) {
        queryClient.setQueryData(['stackItems'], context.previousStackItems);

        toast.error(`Failed to reorder stack items: ${err.message}`);
      }
    },
    // Always refetch after error or success:
    onSuccess: (stackItems: StackItem[]) => {
      if (queryClient && stackItems[0]) {
        queryClient.invalidateQueries({ queryKey: ['stackItems'] });

        toast.success(`New stack item order saved successfully`);
      }
    },
  });

  const { mutateAsync: updateExistingStackItem } = useMutation({
    mutationFn: updateStackItem,
    onMutate: async ({ id, data }) => {
      let previousStackItems: StackItem[] = [];

      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      if (queryClient) {
        await queryClient.cancelQueries({ queryKey: ['stackItems'] });
        previousStackItems = queryClient.getQueryData<StackItem[]>(['stackItems']) || [];

        // Optimistically update to the new value
        queryClient.setQueryData<StackItem[]>(['stackItems'], (old = []) => {
          if (id) {
            // Update existing stack item
            const index = old.findIndex((si) => si.id === id);

            if (index > -1) old[index] = { ...old[index], ...data };
          } else console.error("Couldn't find stack item in cache to update");

          return old;
        });
      } else {
        toast.error('Failed to update stack item: queryClient null');
      }

      return { previousStackItems };
    },
    // Restore the previous stack item list if the mutation fails
    onError: (err, stackItem, context) => {
      if (queryClient && context) {
        queryClient.setQueryData(['stackItems'], context.previousStackItems);

        toast.error(`Failed to update '${stackItem}': ${err.message}`);
      }
    },
    // Always refetch after error or success:
    onSuccess: (stackItems: StackItem[]) => {
      if (queryClient && stackItems[0]) {
        queryClient.invalidateQueries({ queryKey: ['stackItems'] });

        toast.success(`${stackItems[0].name} updated successfully`);
      }
    },
  });

  const { mutateAsync: createNewStackItem } = useMutation({
    mutationFn: createStackItem,
    onMutate: async (stackItem) => {
      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      if (queryClient) {
        await queryClient.cancelQueries({ queryKey: ['stackItems'] });
        const previousStackItems = queryClient.getQueryData<StackItem[]>(['stackItems']);

        // temporary data that will be replaced by the server response with defaults
        const optimisticStackItem = { ...stackItem };
        optimisticStackItem.id = uuidv4();
        optimisticStackItem.createdAt = new Date();
        // TODO: create default position here
        // optimisticStackItem.position =

        // Optimistically update to the new value
        queryClient.setQueryData<StackItem[]>(['stackItems'], (old) =>
          old ? [...old, optimisticStackItem as StackItem] : [optimisticStackItem as StackItem]
        );

        return { previousStackItems, stackItem };
      } else {
        toast.error('Failed to add stack item: queryClient null');
      }
    },
    // Restore the previous stack item list if the mutation fails
    onError: (err, stackItem, context) => {
      if (queryClient && context) {
        queryClient.setQueryData(['stackItems'], context.previousStackItems);

        toast.error(`Failed to add '${stackItem.name}': ${err.message}`);
      }
    },
    // Always refetch after error or success:
    onSettled: (stackItems: StackItem[] = []) => {
      if (queryClient && stackItems[0]) {
        queryClient.invalidateQueries({ queryKey: ['stackItems'] });

        toast.success(`${stackItems[0].name} added successfully`);
      }
    },
  });

  const { mutateAsync: deleteExistingStackItem } = useMutation({
    mutationFn: deleteStackItem,
    onMutate: async (stackItem) => {
      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      if (queryClient) {
        await queryClient.cancelQueries({ queryKey: ['stackItems'] });
        const previousStackItems = queryClient.getQueryData<StackItem[]>(['stackItems']);

        // Optimistically update to the new value
        queryClient.setQueryData<StackItem[]>(['stackItems'], (old) =>
          old?.filter((si) => si.id !== stackItem.id)
        );

        return { previousStackItems, stackItem };
      } else {
        toast.error('Failed to delete item: queryClient null');
      }
    },
    // Restore the previous stack item list if the mutation fails
    onError: (err, stackItem, context) => {
      if (queryClient && context) {
        queryClient.setQueryData(['stackItems'], context.previousStackItems);

        toast.error(`Failed to delete '${stackItem.name}': ${err.message}`);
      }
    },
    // Always refetch after error or success:
    onSettled: (stackItems: StackItem[] = []) => {
      if (queryClient && stackItems[0]) {
        queryClient.invalidateQueries({ queryKey: ['stackItems'] });

        toast.success(`${stackItems[0].name} deleted successfully`);
      }
    },
  });

  return {
    updateExistingStackItem,
    createNewStackItem,
    deleteExistingStackItem,
    reorderExistingStackItems,
    ...query,
  };
}
