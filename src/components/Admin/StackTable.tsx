'use client';

import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import StackItemDialog from '@/components/Admin/StackItemDialog';
import DataTable from '@/components/DataTable/DataTable';
import Loading from '@/components/Site/Loading';

import useDialog from '@/hooks/useDialog';
import useStackItems from '@/hooks/useStackItems';

import { canEditStackItems } from '@/auth/roles';
import { columns } from '@/components/Admin/StackColumns';
import { StackItem } from '@/lib/types';

export default function StackTable() {
  const { data: session } = useSession();
  const canEdit = canEditStackItems(session?.user);

  const { data, isLoading, reorderExistingStackItems } = useStackItems();
  const { open: addStackItem } = useDialog('stackItem');
  const [globalFilter, setGlobalFilter] = useState('');

  useHotkeys(
    'a',
    () => {
      if (canEdit) addStackItem();
    },
    { preventDefault: true }
  );

  if (isLoading) return <Loading />;

  if (!data) return <div>No data</div>;

  const onReorder = (data: StackItem[]) => {
    for (const i in data) {
      data[i].position = parseInt(i) + 1;
    }

    reorderExistingStackItems({ data });
  };

  return (
    <div>
      <h2>Stack Items</h2>
      <div className='flex w-full items-center justify-between gap-2 pb-4'>
        <div>
          <Input
            placeholder='Filter items...'
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className='max-w-64'
          />
        </div>

        {canEdit && (
          <Button variant='outline' onClick={() => addStackItem()}>
            <Plus className='mr-2 size-4' />
            Add Stack Item
          </Button>
        )}
      </div>

      <DataTable
        data={data}
        columns={columns}
        onReorder={onReorder}
        className='rounded-sm border'
        options={{
          onGlobalFilterChange: setGlobalFilter,
          state: {
            globalFilter,
            columnVisibility: { reorder: Boolean(canEdit), dropdown: Boolean(canEdit) },
          },
        }}
      />
      {canEdit && <StackItemDialog />}
    </div>
  );
}
