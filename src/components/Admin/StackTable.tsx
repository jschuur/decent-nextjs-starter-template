'use client';

import { useSession } from 'next-auth/react';

import StackItemDialog from '@/components/Admin/StackItemDialog';
import StackTableItemDropdown from '@/components/Admin/StackTableItemDropdown';
import DataTable from '@/components/DataTable/DataTable';
import Loading from '@/components/Site/Loading';

import useDialog from '@/hooks/useDialog';
import useStackItems from '@/hooks/useStackItems';

import { canEditStackItems } from '@/auth/roles';
import { columns } from '@/components/Admin/StackColumns';

export default function StackTable() {
  const { data: session } = useSession();
  const canEdit = canEditStackItems(session?.user);

  const { data, isLoading } = useStackItems();
  const { open: addStackItem } = useDialog('stackItem');

  if (isLoading) return <Loading />;

  if (!data) return <div>No data</div>;

  return (
    <div>
      <h2>Stack Items</h2>
      <DataTable
        data={data}
        columns={columns}
        canEdit={canEdit}
        addItemTrigger={addStackItem}
        addItemButtonLabel='Add Stack Item'
        itemDialog={StackItemDialog}
        itemRowDropDown={StackTableItemDropdown}
        className='py-2'
      />
    </div>
  );
}
