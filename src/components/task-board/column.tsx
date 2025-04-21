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
  activeId,
}: {
  id: string;
  tasks: Task[];
  overId: string | null;
  activeId: string | null;
}) {
  const { setNodeRef } = useDroppable({ id });
    console.log({ tasks });
  const isOver =
    overId === id ||
    tasks.some((task) => task.id === overId && task.status === id);

    console.log({ isOver, overId });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "25%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px",
        border: "1px solid #f4f4f4",
        borderRadius: "8px",
        background: "white",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <strong className="text-indigo-500 mb-2">{id}</strong>
      <div
        className={`w-full h-full p-4 rounded-md flex flex-col border ${
          isOver
            ? "bg-indigo-100/50 border-gray-300 border-dashed"
            : "bg-gray-100/50 border-gray-200"
        }`}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 && (
            <div style={{ opacity: 0.4, fontStyle: "italic", height: "100px" }}>
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
    </div>
  );
}
