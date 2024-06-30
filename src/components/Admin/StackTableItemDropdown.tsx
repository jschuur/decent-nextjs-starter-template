import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ConfirmationDialog from '@/components/Helpers/ConfirmationDialog';

import useDialog from '@/hooks/useDialog';
import useStackItems from '@/hooks/useStackItems';

import { cn } from '@/lib/utils';

import { StackItem } from '@/lib/types';

type Props = {
  item: StackItem;
  className?: string;
};

export default function StackTableItemDropdown({ className, item }: Props) {
  const { open } = useDialog<StackItem>('stackItem');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { deleteExistingStackItem } = useStackItems();

  if (!item) return null;

  return (
    <>
      <div className={cn(className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 data-[state=open]:visible'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => open(item)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setConfirmOpen(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ConfirmationDialog
        title={`Delete ${item.name}`}
        confirmLabel='Delete'
        isOpen={confirmOpen}
        setIsOpen={setConfirmOpen}
        onConfirm={() => deleteExistingStackItem(item)}
      >
        Are you sure you want to delete this stack item?
      </ConfirmationDialog>
    </>
  );
}
