import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useClickOutside } from "@mantine/hooks";
import CircleTick from "@/components/ui/circle-tick";
import LoaderSpin from "@/components/ui/loader-spin";
import { API } from "@/api";
import { useWikiItems } from "@/queries/useWiki";

export default function BottomBar({
  handleDelete,
  myFeedback,
  id,
  type,
}: {
  handleDelete: () => Promise<{ error?: string }>;
  myFeedback: MediaFeedback;
  id: string;
  type: MediaType | "book";
}) {
  const [uiState, setUiState] = useState<
    "saving" | "saved" | "error" | "ready" | "delete"
  >("ready");
  const [error, setError] = useState<string | null>(null);
  const { refetch } = useWikiItems();

  const ref = useClickOutside(() => {
    setUiState("ready");
  });

  const handleConfirm = async () => {
    const { error } = await handleDelete();
    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (uiState !== "delete") {
      setError(null);
    }
  }, [uiState]);

  const handleSave = async () => {
    setUiState("saving");
    await API.media.saveFeedback(myFeedback, id, type);
    setTimeout(() => {
      setUiState("saved");
      setTimeout(() => setUiState("ready"), 1500);
    }, 500);
    refetch();
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-3 relative">
      <div
        ref={ref}
        className="h-[40px] w-fit flex items-center gap-2 absolute transition-all duration-150 ease-out"
        style={{
          left: 0,
          bottom: uiState === "delete" ? 0 : "5px",
          opacity: uiState === "delete" ? 1 : 0,
          pointerEvents: uiState === "delete" ? "all" : "none",
        }}
      >
        <p className="font-medium select-none text-gray-500 ">Are you sure?</p>
        <p
          className="bg-red-500 hover:bg-red-700 text-white p-2 py-1 rounded-sm cursor-pointer"
          onClick={handleConfirm}
        >
          confirm
        </p>
        <p
          className="bg-gray-500 font-medium select-none cursor-pointer hover:bg-gray-700 text-white p-2 py-1 rounded-sm transition-colors duration-200"
          onClick={() => setUiState("ready")}
        >
          cancel
        </p>
        {error && (
          <p className="text-red-500 font-medium select-none text-xs">
            {error}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {uiState === "saving" && <LoaderSpin size={18} color="#6500d8" />}
        {uiState === "saved" && <CircleTick height={20} width={20} />}
        {uiState === "error" && (
          <p className="text-xs text-red-500 italic">
            Error saving. Please try again.
          </p>
        )}
      </div>
      <div
        onClick={() => setUiState("delete")}
        className="my-[2px] flex justify-center border border-red-500 rounded-sm items-center text-red-500 h-[33px] w-[33px] transition-colors duration-300 ease-in-out hover:bg-red-100 cursor-pointer"
      >
        <FaRegTrashAlt />
      </div>
      <button
        onClick={handleSave}
        disabled={uiState === "saving"}
        className={
          "bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 h-[38px] !transition-all ease-in-out !duration-300 cursor-pointer m-0"
        }
        //   {
        //     "opacity-50 cursor-not-allowed":
        //       !complete || uiState === "saving",
        //   }
      >
        <p className="text-sm m-0 font-semibold">Save</p>
      </button>
    </div>
  );
}
