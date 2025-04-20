import React, { useState } from 'react';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';

// Define types for TypeScript
interface Item {
  id: number;
  text: string;
}

interface Column {
  id: string;
  items: Item[];
}

interface DnDColumnsState {
  columns: { [key: string]: Column };
}

const initialColumns: { [key: string]: Column } = {
  "1": { id: "1", items: [{ id: 1, text: "Item 1" }, { id: 2, text: "Item 2" }] },
  "2": { id: "2", items: [{ id: 3, text: "Item 3" }] },
  "3": { id: "3", items: [{ id: 4, text: "Item 4" }] },
};

// Column Component
const ColumnComponent: React.FC<{ columnId: string; items: Item[]; moveItem: Function }> = ({ columnId, items, moveItem }) => {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        minHeight: '200px',
        backgroundColor: '#f9f9f9',
        width: '200px',
        marginRight: '20px',
      }}
    >
      <h3>Column {columnId}</h3>
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} text={item.text} moveItem={moveItem} columnId={columnId} />
      ))}
    </div>
  );
};

// Draggable Item Component
const DraggableItem: React.FC<{ id: number; text: string; moveItem: Function; columnId: string }> = ({ id, text, moveItem, columnId }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `${columnId}-${id}` });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
        border: '1px solid #ccc',
        marginBottom: '8px',
        cursor: 'move',
        backgroundColor: '#fff',
      }}
    >
      {text}
    </div>
  );
};

// Main App Component
const DnDColumns: React.FC = () => {
  const [columns, setColumns] = useState<DnDColumnsState["columns"]>(initialColumns);

  const moveItem = (item: Item, sourceColumnId: string, destinationColumnId: string) => {
    if (sourceColumnId === destinationColumnId) return;

    const updatedColumns = { ...columns };

    // Remove the item from the source column
    const sourceColumn = updatedColumns[sourceColumnId];
    const sourceItems = sourceColumn.items.filter((colItem) => colItem.id !== item.id);
    updatedColumns[sourceColumnId] = { ...sourceColumn, items: sourceItems };

    // Add the item to the destination column
    const destinationColumn = updatedColumns[destinationColumnId];
    updatedColumns[destinationColumnId] = {
      ...destinationColumn,
      items: [...destinationColumn.items, item],
    };

    setColumns(updatedColumns);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeItemId = active.id.split('-')[1];
    const activeItem = { id: parseInt(activeItemId), text: `Item ${activeItemId}` };
    const sourceColumnId = active.id.split('-')[0];
    const destinationColumnId = over.id;

    moveItem(activeItem, sourceColumnId, destinationColumnId);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        {Object.keys(columns).map((columnId) => {
          const column = columns[columnId];
          return <ColumnComponent key={columnId} columnId={columnId} items={column.items} moveItem={moveItem} />;
        })}
      </div>
    </DndContext>
  );
};

export default DnDColumns;
