import { useTasks } from "@/queries/useTasks";
import { useModalStore } from "@/stores/modal-store";
import { TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IoSearch, IoLayersSharp } from "react-icons/io5";
import { useClickOutside } from "@mantine/hooks";
import { colorCombos } from "@/config/color-config";
import { COLUMNS } from "@/components/task-board/config";

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
  };

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
      title: "Edit Action Item",
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
        <div className="w-full min-h-[50px] rounded-md bg-white border border-gray-300 absolute top-[calc(100%+3px)] left-0 z-50 p-2 flex flex-col gap-2 justify-center items-center">
          {searching ? (
            <p className="text-sm text-gray-500">Searching...</p>
          ) : results.length === 0 ? (
            <p className="text-sm text-gray-500">No results found</p>
          ) : (
            results.map((task) => {
              const colorConfig =
                COLUMNS.find((col) => col.status === task.status)
                  ?.colorConfig ?? colorCombos[0];
              return (
                <div
                  key={task.id}
                  onClick={() => handleItemClick(task)}
                  className="w-full h-[60px] flex items-center cursor-pointer border rounded-lg p-2"
                  style={{ borderColor: colorConfig.accentColor }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: colorConfig.hintColor,
                      color: colorConfig.mainColor,
                      border: `1px solid ${colorConfig.accentColor}`,
                    }}
                  >
                    <IoLayersSharp size={27} />
                  </div>
                  <div className="flex flex-col h-full justify-center p-2 gap-0">
                    <p className="m-0 font-semibold pointer-events-none">
                      {task.title}
                    </p>
                    <p className="text-xs m-0 text-gray-400">
                      {task.space?.title
                        ? `In ${task.space.title} space`
                        : "No space assigned"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
