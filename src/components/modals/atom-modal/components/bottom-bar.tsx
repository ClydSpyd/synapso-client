import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useClickOutside } from "@mantine/hooks";


export default function BottomBar({
  handleDelete,
}: {
  handleDelete: () => Promise<{error?: string}>;
}) {
  const [deleteState, setDeleteState] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

  const ref = useClickOutside(() => {
    setDeleteState(false);
  });

  const handleConfirm = async () => {
    const {error} = await handleDelete();
    if (error) {
      setError(error);
    }
  }

  useEffect(() => {
    if (!deleteState) {
      setError(null);
    }
  }, [deleteState]);

  return (
    <div className="w-full flex justify-end gap-2 mt-3 relative">
      <div
        ref={ref}
        className="h-[40px] w-fit flex items-center gap-2 absolute transition-all duration-150 ease-out"
        style={{
          left: 0,
          bottom: deleteState ? 0 : "5px",
          opacity: deleteState ? 1 : 0,
          pointerEvents: deleteState ? "all" : "none",
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
          onClick={() => setDeleteState(false)}
        >
          cancel
        </p>
        {error && (
          <p className="text-red-500 font-medium select-none text-xs">{error}</p>
        )}
      </div>
      <div
        onClick={() => setDeleteState(true)}
        className="my-[2px] flex justify-center border border-red-500 rounded-sm items-center text-red-500 h-[33px] w-[33px] transition-colors duration-300 ease-in-out hover:bg-red-100 cursor-pointer"
      >
        <FaRegTrashAlt />
      </div>
      <button
        // onClick={handleSave}
        // disabled={!complete || uiState === "saving"}
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