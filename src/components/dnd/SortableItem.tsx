import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableItemProps = {
  id: string;
  children: (props: {
    setNodeRef: (element: HTMLElement | null) => void;
    listeners: any;
    attributes: any;
    style: React.CSSProperties;
  }) => React.ReactNode;
};

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ setNodeRef, listeners, attributes, style })}
    </div>
  );
};

export default SortableItem;

