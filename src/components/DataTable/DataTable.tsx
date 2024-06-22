'use client';

import {
  ColumnDef,
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { ComponentType, createElement, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

// TODO: Don't use 'any' type.
// TODO: Pass in filter function as prop.
const globalFilterFunction: FilterFn<any> = (row, columnId, filterValue: string) => {
  const filterText = filterValue.toLowerCase();
  if (!row) return false;

  // BUG: Doesn't work for tags. Filter function isn't invoked for that columnId.
  return columnId === 'tags'
    ? row.original.tags.some((tag: string) => tag.toLowerCase().includes(filterText))
    : row.getValue(columnId)?.toLowerCase()?.includes(filterText) ?? false;
};

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  canEdit?: boolean;
  addItemTrigger?: () => void;
  addItemButtonLabel?: string;
  itemDialog?: ComponentType;
  itemRowDropDown?: ComponentType;
  className?: string;
};
export default function DataTable<T>({
  data,
  columns,
  canEdit,
  addItemTrigger,
  addItemButtonLabel,
  itemDialog,
  itemRowDropDown,
  className,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useHotkeys(
    'a',
    () => {
      if (addItemTrigger) addItemTrigger();
    },
    { enabled: addItemTrigger && canEdit, preventDefault: true }
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFunction,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });

  const itemDialogElement = itemDialog ? createElement(itemDialog) : null;

  // TODO: Use reusable sort component https://ui.shadcn.com/docs/components/data-table
  return (
    <div className={cn(className)}>
      <div className='flex w-full items-center justify-between gap-2 pb-4'>
        <div className=''>
          <Input
            placeholder='Filter items...'
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className='max-w-64'
          />
        </div>
        {canEdit && addItemTrigger && (
          <Button variant='outline' onClick={() => addItemTrigger()}>
            <Plus className='mr-2 size-4' />
            {addItemButtonLabel || 'Add Row'}
          </Button>
        )}
      </div>

      <div className='rounded-sm border'>
        <Table>
          <TableHeader className='bg-muted'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn('px-0', header.column.columnDef.meta?.classNameHeader)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='bg-white'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const itemRowDropdownElement = itemRowDropDown
                  ? createElement(itemRowDropDown, {
                      item: row.original,
                      className: 'invisible group-hover:visible',
                    })
                  : null;

                return (
                  <TableRow
                    key={row.id}
                    className='group'
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={cn('h-16 py-2', cell.column.columnDef?.meta?.classNameCell)}
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    {canEdit && (
                      <TableCell className='py-2' key={`menu_${row.id}`}>
                        {itemRowDropdownElement}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {canEdit && itemDialogElement}
    </div>
  );
}
