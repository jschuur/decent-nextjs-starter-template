import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Row, flexRender } from '@tanstack/react-table';
import { merge } from 'lodash';
import { CSSProperties } from 'react';

import { TableCell, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

type RowContentProps<T> = {
  row: Row<T> | undefined;
  id: UniqueIdentifier | null;
  style?: CSSProperties;
  className?: string;
  setNodeRef?: (element: HTMLElement | null) => void;
};
export function RowContent<T>({ row, id, className, setNodeRef, ...props }: RowContentProps<T>) {
  if (!row || !id) return null;

  return (
    <TableRow key={row.id} {...props} className={cn(className)} ref={setNodeRef}>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          className={cn('h-16 py-2', cell.column.columnDef?.meta?.classNameCell)}
          key={cell.id}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
export type DraggableRowStyle =
  | CSSProperties
  | ((props: ReturnType<typeof useSortable>) => CSSProperties);

type DraggableRowProps<T> = {
  row: Row<T>;
  id: string;
  className?: string;
  style?: DraggableRowStyle;
};
export default function DraggableRow<T>({ row, id, className, style }: DraggableRowProps<T>) {
  const sortable = useSortable({ id });
  const { transform, transition, setNodeRef, isDragging } = sortable;

  const rowStyle: CSSProperties = merge(
    {
      // use Translate instead of Transform to avoid skewing the default Drag Overlay when dragging into a less tall row
      // rows not centered properly when exiting now though
      // https://github.com/clauderic/dnd-kit/issues/117#issuecomment-789863258
      transform: CSS.Translate.toString(transform),
      transition: transition,
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 1 : 0,
      position: 'relative',
    },
    typeof style === 'function' ? style(sortable) : style
  );

  return (
    <RowContent row={row} id={id} style={rowStyle} setNodeRef={setNodeRef} className={className} />
  );
}
