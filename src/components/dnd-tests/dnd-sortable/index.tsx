import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KeyboardSensor } from "@dnd-kit/core";

const DraggableItem = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px 12px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "8px",
    cursor: "grab",
    boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
    width: "100%",
  };

  return (
    <div className="text-gray-400" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

const DroppableContainer = ({ id, items }: { id: string; items: string[] }) => {
    const { isOver, setNodeRef } = useDroppable({ id });
  
    return (
      <div
        ref={setNodeRef}
        style={{
          width: "200px",
          minHeight: "450px",
          padding: "16px",
          backgroundColor: isOver ? "#e6f7ff" : "#f0f0f0",
          border: "2px dashed #aaa",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <strong className="w-full text-center mx-auto text-indigo-500 uppercase text-xs font-extrabold mb-2">
          {id}
        </strong>
        <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
          {items.length === 0 ? (
            <div style={{ padding: '8px', fontStyle: 'italic', color: '#aaa' }}>
              Drop items here
            </div>
          ) : (
            items.map((item) => <DraggableItem key={item} id={item} />)
          )}
        </SortableContext>
      </div>
    );
  };

export default function DnDSortable() {
const [activeId, setActiveId] = useState<string | null>(null);
  const [containers, setContainers] = useState<Record<string, string[]>>({
    basket1: ["apple"],
    basket2: ["banana", "carrot"],
    basket3: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (itemId: string): string | null => {
    for (const [containerId, items] of Object.entries(containers)) {
      if (items.includes(itemId)) {
        return containerId;
      }
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    console.log("drag start", event);
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("drag end", event);
    console.log("drag end", event.over?.id);
    console.log("drag end", event.over?.data.current?.sortable.containerId);
    const activeId = event.active.id as string;
    const overId = event.over?.id as string;
    const { active, over } = event;

    if (!over) return;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const items = containers[activeContainer];
      const activeId = event.active.id as string;
      const overId = event.over?.id as string;
      const oldIndex = items.indexOf(activeId);
      const newIndex = items.indexOf(overId);

      setContainers({
        ...containers,
        [activeContainer]: arrayMove(items, oldIndex, newIndex),
      });
    } else {
      setContainers((prev) => {
        const fromItems = prev[activeContainer].filter(
          (item) => item !== active.id
        );
        const toItems = [...prev[overContainer]];
        const overIndex = toItems.indexOf(overId);
        toItems.splice(overIndex + 1, 0, activeId);

        return {
          ...prev,
          [activeContainer]: fromItems,
          [overContainer]: toItems,
        };
      });
    }
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: "10px", padding: "32px" }}>
        {Object.entries(containers).map(([id, items]) => (
          <DroppableContainer key={id} id={id} items={items ?? []} />
        ))}
      </div>
      <DragOverlay>
        {activeId ? <DraggableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
