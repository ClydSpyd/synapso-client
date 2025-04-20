import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, COLUMNS, Task } from "./config";
import BoardColumn from "./column";
import TaskItem from "./task-item";

export default function TaskBoard() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Task 1", status: "todo" },
    { id: "2", title: "Task 2", status: "in-progress" },
    { id: "3", title: "Task 3", status: "done" },
    { id: "4", title: "Task 4", status: "done" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const overId = event.over?.id as string;
    setOverId(overId ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (!activeTask) return;

    const activeCol = activeTask.status;
    const overCol = overTask ? overTask.status : over.id;

    if (activeCol === overCol) {
      const tasksInCol = tasks.filter((t) => t.status === activeCol);
      const oldIndex = tasksInCol.findIndex((t) => t.id === active.id);
      let newIndex = tasksInCol.findIndex((t) => t.id === over.id);

      if (newIndex === -1) {
        newIndex = tasksInCol.length;
      }

      if (oldIndex === newIndex) return;

      const reordered = arrayMove(tasksInCol, oldIndex, newIndex);

      const newTasks = [
        ...tasks.filter((t) => t.status !== activeCol),
        ...reordered,
      ];

      setTasks(newTasks);
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === active.id ? { ...task, status: overCol as string } : task
        )
      );
    }

    setActiveId(null);
    setOverId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-2 p-10 w-full">
        {COLUMNS.map((col: Column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === col.status
          );
          const itemIds = columnTasks.map((task) => task.id);

          return (
            <BoardColumn
              key={col.status}
              id={col.status}
              tasks={columnTasks}
              itemIds={itemIds}
              overId={overId}
              activeId={activeId}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeId != null ? (
          <TaskItem
            id={activeId}
            title={tasks.find((task) => task.id === activeId)?.title || ""}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
