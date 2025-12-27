import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import StaggerContainer from "../utility-comps/stagger-container";
import { format } from "date-fns";
import { Menu, Text } from "@mantine/core";
import { BiDotsVertical } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@mantine/hooks";
import { useTasks } from "@/queries/useTasks";
import { API } from "@/api";
import { useModalStore } from "@/stores/modal-store";

export default function TaskItem({
  task,
  isDragging,
  colorConfig,
  column,
}: {
  task: Task;
  isDragging?: boolean;
  colorConfig: ColorCombo;
  column?: TaskStatus;
}) {
  const [confState, setConfState] = useState(false);
  const ref = useClickOutside(() => setConfState(false));
  const { open } = useModalStore();
  const { id, title, description, createdAt, space } = task;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: draggingFromDndKit,
  } = useSortable({ id });
  const { refetch } = useTasks();

  const handleDelete = async () => {
    await API.tasks.delete(task.id);
    refetch();
  }
  

  const borderColor = ["todo", "in-progress", "blocked"].includes(column ?? "")
    ? colorConfig.accentColor
    : colorConfig.mainColor;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "16px 12px",
    backgroundColor: colorConfig?.hintColor,
    border: `1px solid ${borderColor}`,
    borderRadius: "8px",
    cursor: "grab",
    boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
    opacity: isDragging || draggingFromDndKit ? 0.2 : 1, // Hide original during drag
  };

  return (
    <StaggerContainer className="h-fit group relative mb-2">
      <div className="absolute top-2 right-1">
        <Menu trigger="click" withArrow offset={0}>
          <Menu.Target>
            <div className="h-[30px] w-[30px] rounded-sm flex items-center justify-center cursor-pointer transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
              <BiDotsVertical
                size={18}
                style={{
                  color: colorConfig.accentColor,
                }}
              />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                window.history.replaceState(
                  {},
                  document.title,
                  "/tasks/" + task.id
                );
                open({
                  title: "Edit Action",
                  type: "task",
                  payload: task,
                  modalStyles: {
                    content: {
                      maxWidth: "80vw",
                      width: "700px",
                      minWidth: "60vw",
                    },
                  },
                  handlers: {
                    onClose: () => {
                      window.history.replaceState({}, document.title, "/tasks");
                    },
                  },
                });
              }}
              leftSection={
                <FaEye className="text-lg text-slate-500 cursor-pointer" />
              }
            >
              <Text size="xs">View item</Text>
            </Menu.Item>
            <Menu.Item
              onClick={() => setConfState(true)}
              leftSection={
                <MdDeleteForever className="text-lg text-slate-500 cursor-pointer" />
              }
            >
              <Text size="xs">Delete item</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className="flex items-center justify-between gap-2 leading-tight">
          <h1 className="font-bold text-gray-500/80">{title}</h1>
        </div>
        <p className="text-xs font-medium text-gray-400 line-clamp-3">
          {description}
        </p>
        <div
          className="flex w-full items-center mt-2"
          style={{ justifyContent: !!space ? "space-between" : "flex-end" }}
        >
          {space && (
            <div
              className="px-2 py-[2px] rounded-sm text-[11px] font-semibold text-white"
              style={{
                backgroundColor: colorConfig.accentColor,
                color: colorConfig.mainColor,
              }}
            >
              {space.title}
            </div>
          )}
          <p
            className="text-xs text-gray-500 font-bold"
            style={{
              color: borderColor,
            }}
          >
            {format(createdAt, "dd-MM-yyyy")}
          </p>
        </div>
      </div>
      {/* delete confirmation state */}
      <div
        ref={ref}
        className={cn(
          "absolute w-full h-full backdrop-blur-md bg-gray-200/10 flex flex-col gap-2 transition-all ease-in-out duration-200 left-0 items-center justify-center z-20 rounded-[8px]",
          confState
            ? "bottom-0 opacity-100 pointer-events-auto"
            : "bottom-1/3 opacity-0 pointer-events-none"
        )}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <p className="text-sm text-slate-600 font-semibold">Are you sure?</p>
        <div className="flex gap-2">
          <button
            onClick={() => setConfState(false)}
            className="px-2 py-1 bg-slate-200 rounded-md !text-sm font-semibold cursor-pointer text-slate-700 border border-gray-400"
            style={{
              borderColor: borderColor,
              backgroundColor: colorConfig.hintColor,
              color: colorConfig.mainColor,
            }}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 bg-red-500 rounded-md !text-sm font-semibold cursor-pointer text-white"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </StaggerContainer>
  );
}
