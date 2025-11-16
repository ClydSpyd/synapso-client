import { useModalStore } from "@/stores/modal-store";
import { TextInput } from "@mantine/core";
import { IoSearch } from "react-icons/io5";
import TaskSearchInput from "./task-search-input";

export default function TaskFilters({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const { open } = useModalStore();
  return (
    <div className="w-full max-w-[1200px] mx-auto flex justify-between py-4">
      <div>
        <TaskSearchInput />
      </div>
      <button
        className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-4 py-1 !transition-all ease-in-out !duration-300 cursor-pointer"
        onClick={() =>
          open({
            type: "task",
            modalStyles: {
              content: {
                maxWidth: "80vw",
                width: "700px",
                minWidth: "60vw",
                borderRadius: "12px",
              },
            },
          })
        }
      >
        <h1 className="text-lg m-0 font-semibold relative bottom-0.5">+</h1>
        <p className="text-sm m-0 font-semibold">ADD ITEM</p>
      </button>
    </div>
  );
}
