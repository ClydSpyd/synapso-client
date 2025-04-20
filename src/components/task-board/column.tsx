import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "./config";
import TaskItem from "./task-item";

export default function BoardColumn({
  id,
  tasks,
  overId,
  itemIds,
  activeId,
}: {
  id: string;
  tasks: Task[];
  overId: string | null;
  itemIds: string[];
  activeId: string | null;
}) {
  const { setNodeRef } = useDroppable({ id });

  const isOver =
    overId === id ||
    tasks.some((task) => task.id === overId && task.status === id);

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "25%",
        minHeight: "450px",
        padding: "16px",
        backgroundColor: isOver ? "#d0f0c0" : "#f0f0f0",
        border: "2px dashed #aaa",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <strong className="text-indigo-500 mb-2">{id}</strong>
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        {tasks.length === 0 && (
          <div style={{ opacity: 0.4, fontStyle: "italic" }}>
            Drop tasks here
          </div>
        )}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            isDragging={activeId === task.id}
          />
        ))}
      </SortableContext>
    </div>
  );
}
