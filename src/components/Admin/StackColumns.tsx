import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

import StackItemBadge from '@/components/Template/StackItemBadge';

import { formatDateShort } from '@/lib/utils';

import { StackItem } from '@/lib/types';

type SortHeaderParams = {
  column: Column<StackItem>;
  name: string;
};
const sortHeader = ({ column, name }: SortHeaderParams) => {
  const isSorted = column.getIsSorted();

  return (
    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {name}
      {isSorted === 'asc' ? (
        <ArrowUp className='ml-2 h-4 w-4' />
      ) : isSorted === 'desc' ? (
        <ArrowDown className='ml-2 h-4 w-4' />
      ) : (
        <div className='w-6' />
      )}
    </Button>
  );
};

export const columns: ColumnDef<StackItem>[] = [
  {
    accessorKey: 'position',
    enableGlobalFilter: false,
    header: ({ column }) => sortHeader({ column, name: '#' }),
    cell: (cell) => <span className='text-slate-500'>{cell.getValue() as number}</span>,
    meta: {
      classNameHeader: 'justify-end',
      classNameCell: 'text-right',
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => sortHeader({ column, name: 'Name' }),
    cell: (cell) => {
      const link = cell.row.original.link;
      const name = cell.getValue<string>();

      return link ? (
        <a className='text-link' href={link} target='_blank' rel='noopener noreferrer'>
          {name}
        </a>
      ) : (
        <span>{name}</span>
      );
    },
  },
  {
    accessorKey: 'description',
    enableGlobalFilter: true,
    header: ({ column }) => sortHeader({ column, name: 'Description' }),
  },
  {
    accessorKey: 'tags',
    enableGlobalFilter: true,
    header: 'Tags',
    cell: (cell) => {
      const tags = cell.getValue<string[]>();

      return (
        <div className='flex gap-2'>
          {tags.map((tag) => (
            <StackItemBadge key={tag} tag={tag} />
          ))}
        </div>
      );
    },
    meta: {
      classNameHeader: 'px-4',
    },
  },
  {
    accessorKey: 'createdAt',
    enableGlobalFilter: false,
    header: ({ column }) => sortHeader({ column, name: 'Added' }),
    cell: (cell) => (
      <span className='whitespace-nowrap'>{formatDateShort(cell.getValue() as Date)}</span>
    ),
  },
];
