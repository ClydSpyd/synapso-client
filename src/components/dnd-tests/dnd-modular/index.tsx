import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const DRAGGABLES = ['apple', 'banana', 'carrot'];
const DROPPABLES = ['col-1', 'col-2'];

function Draggable({ id }: { id: string }) {
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
    width: '200px',
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

export default function DnDExample() {
  const [locations, setLocations] = useState<Record<string, string | null>>({
    apple: null,
    banana: null,
    carrot: null,
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setLocations((prev) => ({
      ...prev,
      [active.id]: over ? over.id : null,
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '32px', padding: '32px' }}>
        {/* Unassigned draggables */}
        <div>
          <h3>Unassigned</h3>
          {DRAGGABLES.filter((id) => !locations[id]).map((id) => (
            <Draggable key={id} id={id} />
          ))}
        </div>

        {/* Render droppables */}
        {DROPPABLES.map((dropId) => (
          <Droppable key={dropId} id={dropId}>
            {DRAGGABLES.filter((id) => locations[id] === dropId).map((id) => (
              <Draggable key={id} id={id} />
            ))}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
}
