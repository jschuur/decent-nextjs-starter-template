import { ColumnDef } from '@tanstack/react-table';

import StackTableItemDropdown from '@/components/Admin/StackTableItemDropdown';
import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader';
import DragHandle from '@/components/DataTable/DragHandle';
import StackItemBadge from '@/components/Template/StackItemBadge';

import { formatDateShort } from '@/lib/utils';

import { StackItem } from '@/lib/types';

export const columns: ColumnDef<StackItem>[] = [
  {
    accessorKey: 'reorder',
    enableGlobalFilter: false,
    header: undefined,
    cell: (cell) => <DragHandle rowId={cell.row.id} className='mb-[2px]' />,
    meta: {},
  },
  {
    accessorKey: 'position',
    enableGlobalFilter: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title='' />,
    cell: (cell) => <span className='text-slate-500'>{cell.getValue() as number}</span>,
    meta: {
      classNameHeader: 'px-0',
      classNameCell: 'text-right tabular-nums px-0',
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
  },
  {
    accessorKey: 'tags',
    // FIXME: This doesn't work. When I was using a custom filter function, it wasn't invoked for this column.
    enableGlobalFilter: true,
    // Does this work for substrings? Or do we need a custom filter function?
    filterFn: 'arrIncludesSome',
    header: 'Tags',
    cell: (cell) => {
      const tags = cell.getValue<string[]>();

      return (
        <div className='flex min-h-6 gap-2'>
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='Added' />,
    cell: (cell) => (
      <span className='whitespace-nowrap'>{formatDateShort(cell.getValue() as Date)}</span>
    ),
  },
  {
    accessorKey: 'dropdown',
    enableGlobalFilter: false,
    header: '',
    cell: (cell) => (
      <StackTableItemDropdown item={cell.row.original} className='invisible group-hover:visible' />
    ),
  },
];
