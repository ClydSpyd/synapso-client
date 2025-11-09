import { API } from "@/api";
import { colorCombos } from "@/config/color-config";
import { cn } from "@/lib/utils";
import { useIdeas } from "@/queries/useIdeas";
import { useMemo, useState } from "react";

export default function IdeaInput() {
  const [inputVals, setInputVals] = useState<{ text: string; tags: string }>({
    text: "",
    tags: "",
  });

  const formComplete = useMemo(() => {
    return Object.values(inputVals).every((val) => val.length > 0);
  }, [inputVals]);

  const { refetch } = useIdeas();

  const handleSave = async () => {
    if (!formComplete) return;
    await API.ideas.create({
      title: inputVals.text,
      tags: inputVals.tags.split(",").map((tag) => tag.trim()),
    });
    console.log("Saving idea:", inputVals);
    // Reset input fields after saving
    setInputVals({ text: "", tags: "" });
    refetch();
  };

  const moduleColorConf = colorCombos[1];
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="border rounded-lg p-4"
      style={{
        borderColor: moduleColorConf.accentColor,
        backgroundColor: moduleColorConf.hintColor,
      }}
    >
      <textarea
        placeholder="Record your thought/idea here..."
        value={inputVals.text}
        onChange={(e) =>
          setInputVals((prev) => ({ ...prev, text: e.target.value }))
        }
        className="resize-none bg-transparent outline-none w-full p-2 rounded-md"
        style={{
          // color: moduleColorConf.mainColor,
          color: "#7a7a7a",
          backgroundColor: "white",
          border: `2px dashed ${moduleColorConf.accentColor}`,
        }}
      />
      <div className="flex gap-1 items-center">
        <div className="flex-1 border-t border-gray-100">
          <input
            value={inputVals.tags}
            onChange={(e) =>
              setInputVals((prev) => ({ ...prev, tags: e.target.value }))
            }
            className="w-full rounded-md border p-2"
            type="text"
            placeholder="Tags: work, idea, urgent..."
            style={{
              // color: moduleColorConf.mainColor,
              color: "#7a7a7a",
              backgroundColor: "white",
              border: `2px dashed ${moduleColorConf.accentColor}`,
            }}
          />
        </div>
        <button
          type="submit"
          className={cn(
            "h-[42px] flex items-center text-white rounded-md gap-1 px-6 py-1 !transition-all ease-in-out !duration-300 cursor-pointer",
            {
              "opacity-50 cursor-not-allowed": !formComplete,
            }
          )}
          style={{
            backgroundColor: moduleColorConf.mainColor,
          }}
        >
          <p className="text-sm m-0 font-semibold">Save</p>
        </button>
      </div>
    </form>
  );
}
