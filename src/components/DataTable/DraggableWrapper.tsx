import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { ReactNode } from 'react';

type DNDWrapperProps = {
  children: ReactNode;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
};
export default function DraggableWrapper({ children, onDragStart, onDragEnd }: DNDWrapperProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
}
