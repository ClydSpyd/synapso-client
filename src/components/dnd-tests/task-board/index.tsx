import { useState } from "react";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface Column {
    status: string;
    title: string;
}

interface Task {
    id: number;
    title: string;
    status: string;
}

const COLUMNS: Column[] = [
  { status: "todo", title: "Input" },
  { status: "in-progress", title: "Active" },
  { status: "blocked", title: "Dormant" },
  { status: "done", title: "Completed" },
];

function Draggable({ id }: { id: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    padding: '8px 12px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '8px',
    cursor: 'grab',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {id}
    </div>
  );
}

function Droppable({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    width: '25%',
    minHeight: '450px',
    padding: '16px',
    backgroundColor: isOver ? '#d0f0c0' : '#f0f0f0',
    border: '2px dashed #aaa',
    borderRadius: '8px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <strong className='text-indigo-500'>{id}</strong>
      <div style={{ marginTop: '8px' }}>{children}</div>
    </div>
  );
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1", status: "todo" },
    { id: 2, title: "Task 2", status: "in-progress" },
    { id: 3, title: "Task 3", status: "blocked" },
    { id: 4, title: "Task 4", status: "done" },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const current = [...tasks];
    const activeIndex = current.findIndex((task) => task.id === active.id);
    current[activeIndex] = {
      ...current[activeIndex],
      status:  over.id as string,
    };
    setTasks(current);
  };

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "32px",
            width: "100%",
          }}
        >
          {/* Render droppables */}
          {COLUMNS.map((col: Column) => (
            <Droppable key={col.status} id={col.status}>
              {tasks
                .filter((item: Task) => item.status === col.status)
                .map((task) => (
                  <Draggable key={task.id} id={task.id} />
                ))}
            </Droppable>
          ))}
        </div>
      </DndContext>
    );
}
