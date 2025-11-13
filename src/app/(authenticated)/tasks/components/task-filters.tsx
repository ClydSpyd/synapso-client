import { useModalStore } from "@/stores/modal-store";
import { TextInput } from "@mantine/core";
import { IoSearch } from "react-icons/io5";

export default function TaskFilters({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const { open } = useModalStore();
  return (
    <div className="w-full max-w-[1200px] mx-auto flex justify-between py-4">
      <div>
        <div className="rounded-md border border-gray-300 flex items-center h-[40px] w-[400px] px-2">
          <IoSearch className="text-gray-300 text-2xl" />
          <TextInput
            // onChange={handleTextInput}
            className="w-full"
            placeholder="Search tasks..."
            styles={{
              input: {
                width: "100%",
                border: "none",
                boxShadow: "none",
                "&:focus": {
                  border: "none",
                  boxShadow: "none",
                },
              },
              wrapper: {
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              },
            }}
          />
        </div>
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
