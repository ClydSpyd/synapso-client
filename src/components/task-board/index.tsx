"use client";
import { act, useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  rectIntersection,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, COLUMNS } from "./config";
import BoardColumn from "./column";
import TaskItem from "./task-item";
import { useTasks } from "@/queries/useTasks";
import { API } from "@/api";

export default function TaskBoard() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));


  const { data: tasksBE } = useTasks();

  useEffect(() => {
    if (tasksBE) {
      setTasks(tasksBE);
    }
  }, [tasksBE]);

  if (!tasksBE) return null;
  

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const overId = event.over?.id as string;
    setOverId(overId ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    setOverId(null);
    if (!over) return;
    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);
    
    if (!activeTask) return;
    
    const activeCol = activeTask.status;
    const overCol = overTask ? overTask.status : over.id;
    console.log({ activeTask, overCol });

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
          task.id === active.id
            ? { ...task, status: overCol as TaskStatus }
            : task
        )
      );

      API.tasks.update(
        active.id as string,
        { status: overCol as TaskStatus }
      );

    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* <div>
        <h6>active: {activeId}</h6>
        <h6>over: {overId}</h6>
      </div> */}
      <div className="flex justify-center gap-2 p-4 w-full h-fit min-h-auto grow">
        {COLUMNS.map((col: Column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === col.status
          );
          return (
            <BoardColumn
              key={col.status}
              colunmConfig={col}
              tasks={columnTasks}
              overId={overId}
              activeId={activeId}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeId != null ? (
          <TaskItem
            colorConfig={{
              mainColor: "#ccc",
              hintColor: "#ffffffae",
              accentColor: "#e2e2e2f0",
              scale: [],
            }}
            task={tasks.find((task) => task.id === activeId) as Task}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
