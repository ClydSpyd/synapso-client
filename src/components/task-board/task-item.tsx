import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({
  id,
  title,
  isDragging,
}: {
  id: string;
  title: string;
  isDragging?: boolean;
}) {
  const {
    attributes,
    listeners, 
    setNodeRef,
    transform,
    transition,
    isDragging: draggingFromDndKit,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: "60px",
    padding: "8px 12px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "8px",
    cursor: "grab",
    boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
    opacity: isDragging || draggingFromDndKit ? 0.2 : 1, // Hide original during drag
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {title}
    </div>
  );
}
