import { useSortable } from '@dnd-kit/sortable';
import { GripHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

type DragHandleProps = {
  rowId: string;
  className?: string;
  enabled?: boolean;
};
export default function DragHandle({ rowId, className, enabled = true }: DragHandleProps) {
  const { attributes, listeners } = useSortable({
    id: rowId,
    disabled: !enabled,
  });

  if (!enabled) return null;

  return (
    <GripHorizontal
      {...attributes}
      {...listeners}
      className={cn('invisible group-hover:visible', className)}
    />
  );
}
