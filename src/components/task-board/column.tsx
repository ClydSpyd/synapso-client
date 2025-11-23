import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column } from "./config";
import TaskItem from "./task-item";

export default function BoardColumn({
  tasks,
  overId,
  activeId,
  colunmConfig,
}: {
  colunmConfig: Column
  tasks: Task[];
  overId: string | null;
  activeId: string | null;
}) {
  const id = colunmConfig.status;
  const Icon = colunmConfig.icon;
  const PlaceholderIcon = colunmConfig.placeholder.icon;
  
  const borderColor = ['todo', 'in-progress', 'blocked'].includes(id)
    ? colunmConfig.colorConfig.accentColor
    : colunmConfig.colorConfig.mainColor;

  const { setNodeRef } = useDroppable({ id });

  const isOver =
    overId === id ||
    tasks.some((task) => task.id === overId && task.status === id);

  return (
    <div
      ref={setNodeRef}
      className="w-1/4 max-w-[300px] min-h-full flex flex-col items-center border border-gray-200 rounded-xl overflow-hidden shadow-md grow"
      style={{ borderColor }}
    >
      {/* COLUMN HEADER */}
      <div
        className="p-5 border-b flex items-center justify-between w-full"
        style={{
          borderColor,
          backgroundColor: colunmConfig.colorConfig.accentColor,
        }}
      >
        <div className="flex gap-2 h-full items-center">
          <Icon size={20} color={colunmConfig.colorConfig.mainColor} />
          <strong
            style={{
              color: colunmConfig.colorConfig.mainColor,
            }}
          >
            {colunmConfig.title}
          </strong>
        </div>
        <div
          className="flex items-center justify-center h-6 w-6 rounded-full"
          style={{
            backgroundColor: colunmConfig.colorConfig.hintColor,
          }}
        >
          <p
            style={{
              color: colunmConfig.colorConfig.mainColor,
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            {tasks.length}
          </p>
        </div>
      </div>

      {/* COLUMN TASKS AREA */}
      <div className="w-full h-full p-2 flex flex-col">
        <div
          className={`w-full h-full p-2 rounded-md flex flex-col border-2`}
          style={
            isOver
              ? {
                  backgroundColor: colunmConfig.colorConfig.hintColor,
                  borderColor: colunmConfig.colorConfig.accentColor,
                  borderStyle: "dashed",
                  opacity: 0.5,
                }
              : tasks.length === 0
              ? {
                  borderStyle: "dashed",
                  borderColor: colunmConfig.colorConfig.hintColor,
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }
          }
        >
          {tasks.length === 0 && !isOver ? (
            <div className="h-[100%] w-full flex flex-col items-center justify-center my-auto text-center text-[#b8c1cc]">
              <PlaceholderIcon
                style={{ marginBottom: "5px", height: "30px", width: "30px" }}
                color={"#b8c1cc"}
              />
              <h1 className="font-bold">{colunmConfig.placeholder.title}</h1>
              <p className="text-sm">{colunmConfig.placeholder.description}</p>
            </div>
          ) : (
            <SortableContext
              items={tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  colorConfig={colunmConfig.colorConfig}
                  task={task}
                  isDragging={activeId === task.id}
                  column={colunmConfig.status}
                />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
}
