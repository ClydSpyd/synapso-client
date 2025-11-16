import { useTasks } from "@/queries/useTasks";
import { useModalStore } from "@/stores/modal-store";
import { TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useClickOutside } from "@mantine/hooks";

export default function TaskSearchInput() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Task[]>([]);
  const { data } = useTasks();
  const { open: openModal } = useModalStore();

  const ref = useClickOutside(() => resetSearch());

  const resetSearch = () => {
    setOpen(false);
    setInput("");
    setResults([]);
    setSearching(false);
  }

  const handleSearch = useDebouncedCallback(() => {
    setSearching(true);
    const filtered = (data || []).filter(
      (task) =>
        task.title.toLowerCase().includes(input.toLowerCase()) ||
        task.description.toLowerCase().includes(input.toLowerCase())
    );
    setResults(filtered);
    setSearching(false);
  }, 400);

  const handleItemClick = (task: Task) => {
    window.history.replaceState({}, document.title, "/tasks/" + task.id);
    openModal({
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
    resetSearch();
  };

  useEffect(() => {
    if (input.trim() !== "") {
      setSearching(true);
      handleSearch();
    }
  }, [input, data]);

  return (
    <div
      ref={ref}
      className="rounded-md border border-gray-300 flex items-center h-[40px] w-[400px] px-2 relative"
    >
      <IoSearch className="text-gray-300 text-2xl" />
      <TextInput
        value={input}
        onFocus={() => setOpen(true)}
        onChange={(e) => setInput(e.target.value)}
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
      {open && input.trim() !== "" && (
        <div className="w-full min-h-[100px] rounded-md bg-white border border-gray-300 absolute top-[calc(100%+3px)] left-0 z-50">
          {searching ? (
            <p className="p-4 text-sm text-gray-500">Searching...</p>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No results found.</p>
          ) : (
            results.map((task) => (
              <div
                key={task.id}
                onClick={() => handleItemClick(task)}
                className="p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
              >
                <p className="m-0 font-semibold pointer-events-none">
                  {task.title}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
