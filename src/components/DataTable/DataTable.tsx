'use client';

import { DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  ColumnDef,
  SortingState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { merge } from 'lodash';
import pluralize from 'pluralize';
import { useMemo, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import DataTablePagination from '@/components/DataTable/DataTablePagination';
import DraggableRow from '@/components/DataTable/DraggableRow';
import DraggableWrapper from '@/components/DataTable/DraggableWrapper';

import { cn } from '@/lib/utils';

import { DraggableRowStyle } from '@/components/DataTable/DraggableRow';

// based on https://tanstack.com/table/v8/docs/framework/react/examples/row-dnd

export type DragOverlayProp =
  | JSX.Element
  | ((props: { activeId: UniqueIdentifier | null }) => JSX.Element);

type Props<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  canReorder?: boolean;
  onReorder?: (data: TData[]) => void;
  handleDragEnd?: (event: DragEndEvent) => void;
  handleDragStart?: (event: DragStartEvent) => void;
  dragOverlay?: DragOverlayProp;
  draggableRowStyle?: DraggableRowStyle;
  paginationSize?: number;
  paginationSteps?: number[];
  itemCountFooter?: boolean | ((count: number) => React.ReactNode);
  options?: Partial<TableOptions<TData>>;
  className?: string;
};
export default function DataTable<TData extends { id: UniqueIdentifier }, TValue>({
  data,
  columns,
  onReorder,
  handleDragEnd,
  handleDragStart,
  dragOverlay,
  draggableRowStyle,
  paginationSize,
  paginationSteps = [10, 25, 50, 100],
  itemCountFooter,
  options,
  className,
}: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(paginationSize || data.length);
  const isClient = useIsClient();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const table = useReactTable<TData>(
    merge(
      {
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row: TData) => row.id,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
          sorting,
          pagination: {
            pageIndex,
            pageSize,
          },
        },
      },
      options
    )
  );

  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id), [data]);

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id && onReorder) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);

      const newOrder = arrayMove(data, oldIndex, newIndex);

      if (onReorder) onReorder(newOrder);
    }

    setActiveId(null);
  };

  if (!isClient) return null;

  const dragOverlayElement: DragOverlayProp =
    typeof dragOverlay === 'function'
      ? dragOverlay({ activeId })
      : dragOverlay ?? (
          <DragOverlay dropAnimation={null}>
            {activeId ? <Separator className='mx-auto max-w-5xl bg-black' /> : null}
          </DragOverlay>
        );

  return (
    <div className={cn(className)}>
      <DraggableWrapper
        onDragEnd={handleDragEnd || onDragEnd}
        onDragStart={handleDragStart || onDragStart}
      >
        <Table>
          <TableHeader className='bg-muted'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn('px-4', header.column.columnDef.meta?.classNameHeader)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className='bg-white'>
            {table.getRowModel().rows?.length ? (
              <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow
                    key={row.id}
                    row={row}
                    id={row.id}
                    className='group'
                    style={draggableRowStyle}
                  />
                ))}
                {dragOverlayElement}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DraggableWrapper>

      {paginationSize && (
        <div className='border-t-[1px] bg-white p-4'>
          <DataTablePagination
            table={table}
            setPageSize={setPageSize}
            setPageIndex={setPageIndex}
            paginationSteps={paginationSteps}
          />
        </div>
      )}

      {itemCountFooter && (
        <>
          {typeof itemCountFooter === 'function' ? (
            itemCountFooter(data.length)
          ) : (
            <div className='border-t-[1px] bg-white p-4 text-sm text-primary'>
              {`Total: ${pluralize('item', data.length, true)} `}
            </div>
          )}
        </>
      )}
    </div>
  );
}
