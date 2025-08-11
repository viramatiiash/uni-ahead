import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useEffect, useState } from "react";

type SortableListProps<T> = {
  items: T[];
  getId: (item: T) => string;
  renderItem: (
    item: T,
    dragProps: {
      setNodeRef: (element: HTMLElement | null) => void;
      listeners: any;
      attributes: any;
      style: React.CSSProperties;
    }
  ) => React.ReactNode;
  onChange?: (newOrder: T[]) => void;
};

export const SortableList = <T,>({
  items,
  getId,
  renderItem,
  onChange,
}: SortableListProps<T>) => {
  const [currentItems, setCurrentItems] = useState(items);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);
  

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = currentItems.findIndex(
      (item) => getId(item) === active.id
    );
    const newIndex = currentItems.findIndex((item) => getId(item) === over.id);

    const newOrder = arrayMove(currentItems, oldIndex, newIndex);
    setCurrentItems(newOrder);
    onChange?.(newOrder);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={currentItems.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        {currentItems.map((item) => (
          <SortableItem key={getId(item)} id={getId(item)}>
            {(dragProps) => renderItem(item, dragProps)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};
