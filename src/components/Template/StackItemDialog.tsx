'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { mapValues, maxBy, pickBy } from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import useDialog from '@/hooks/useDialog';
import useStackItems from '@/hooks/useStackItems';

import { StackItem } from '@/lib/types';
import { getErrorMessage } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1),
  link: z.string().url(),
  description: z.string().optional(),
  position: z.coerce.number().int().positive().min(1).optional(),
  tags: z.array(z.string()).optional(),
});

export default function StackItemDialog() {
  const { isOpen, close, setIsOpen, data: stackItem } = useDialog<StackItem>('stackItem');
  const { updateExistingStackItem, createNewStackItem, data: items } = useStackItems();

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      name: stackItem?.name || '',
      description: stackItem?.description || '',
      link: stackItem?.link || '',
      tags: stackItem?.tags || [],
      position: stackItem?.position || (items ? (maxBy(items, 'position')?.position || 0) + 1 : 1),
    },
  });

  // TODO: Check permissions again in server action https://stackoverflow.com/a/78256091/122864
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedValues = mapValues(
        pickBy(values, (_, key) => form.formState.dirtyFields?.[key as keyof typeof values]),
        (val) => (val === undefined ? null : val)
      );

      if (Object.keys(updatedValues).length > 0) {
        if (stackItem) updateExistingStackItem({ id: stackItem.id, data: updatedValues });
        else createNewStackItem({ id: uuidv4(), ...values });
      } else toast.info('No changes to update');

      form.reset();
      close();
    } catch (err) {
      toast.error(`Failed to update stack item: ${getErrorMessage(err)}`);
    }
  }

  function onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      if (form.formState.isDirty) toast.warning('Warning: Stack item changes were not saved');

      form.reset();
    }

    setIsOpen(isOpen);
  }

  function splitTags(tags: string) {
    if (!tags) return [];

    return tags.split(',').map((tag) => tag.trim());
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle className='mb-2'>{stackItem ? 'Edit' : 'Add'} Stack Item</DialogTitle>
              <DialogDescription>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className='w-72' data-1p-ignore />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className='w-full' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='link'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input {...field} className='w-full' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex flex-row justify-between gap-2'>
                  <FormField
                    control={form.control}
                    name='tags'
                    render={({ field }) => (
                      <FormItem className='mb-4'>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className='w-64'
                            onChange={(e) => field.onChange(splitTags(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                      <FormItem className='mb-4'>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input {...field} className='w-24' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button disabled={!form.formState.isDirty} type='submit'>
                {stackItem ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
