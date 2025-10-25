import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { colorCombos } from "@/config/color-config";
import { cn } from "@/lib/utils";
import { Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

interface BrainDumpItem {
  text: string;
  tags: string[];
  createdAt: Date;
}

const getTagColorConfig = (tag: string): ColorCombo => {
  const intVal = parseInt(tag.charCodeAt(0).toString(), 10);
  const colorConfig = colorCombos[intVal % colorCombos.length];
  return colorConfig;
};

export default function BrainDump() {
  const [items, setItems] = useState<BrainDumpItem[]>([
    {
      text: "Finish the project proposal for the new client.",
      tags: ["work", "urgent"],
      createdAt: new Date(),
    },
    {
      text: "Buy groceries: milk, eggs, bread, and fruits.",
      tags: ["personal", "shopping", "urgent"],
      createdAt: new Date(),
    },
  ]);

  const moduleColorConf =  colorCombos[2];
  return (
    <ModuleWrapper className="min-h-[300px] grow">
      <div className="flex gap-2">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-lg"
          style={{
            backgroundColor: moduleColorConf.hintColor,
            color: moduleColorConf.mainColor,
          }}
        >
          <IoMdCloudUpload size={22} />
        </div>
        <div className="grow">
          <h1 className="font-semibold text-slate-500">Brain Dump</h1>
          <p className="text-xs text-slate-400/60 font-semibold">
            Capture your thoughts + ideas to further develop them later
          </p>
        </div>
      </div>
      <div className="my-4 flex flex-col gap-3">
        {/* input section  */}
        <div
          className="border-2 border-dashed rounded-lg p-4"
          style={{
            borderColor: moduleColorConf.accentColor,
            backgroundColor: moduleColorConf.hintColor,
          }}
        >
          <textarea
            placeholder="Record your thought/idea here..."
            className="resize-none bg-transparent outline-none w-full p-2 rounded-md"
            style={{
              // color: moduleColorConf.mainColor,
              color: "#7a7a7a",
              backgroundColor: moduleColorConf.hintColor,
              border: `1px solid ${moduleColorConf.accentColor}`,
            }}
          />
          <div className="flex gap-1 items-center">
            <div className="flex-1 border-t border-gray-100">
              <input
                className="w-full rounded-md border p-2"
                type="text"
                placeholder="Tags: work, idea, urgent..."
                style={{
                  // color: moduleColorConf.mainColor,
                  color: "#7a7a7a",
                  backgroundColor: moduleColorConf.hintColor,
                  border: `1px solid ${moduleColorConf.accentColor}`,
                }}
              />
            </div>
            <button
              className={cn(
                "h-[40px] flex items-center text-white rounded-md gap-1 px-6 py-1 !transition-all ease-in-out !duration-300 cursor-pointer"
                // {
                //   "opacity-50 cursor-not-allowed":
                //     !complete || uiState === "saving",
                // }
              )}
              style={{
                backgroundColor: moduleColorConf.mainColor,
              }}
            >
              <p className="text-sm m-0 font-semibold">Save</p>
            </button>
          </div>
        </div>

        {/* list section  */}
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg flex flex-col gap-1">
              <p className="text-base font-semibold text-gray-500/70">{item.text}</p>
              <div className="flex gap-2 mt-2">
                {item.tags.map((tag, idx) => {
                  const colorConfig = getTagColorConfig(tag);
                  return (
                    <span
                      key={idx}
                      className="text-xs px-2 py-[2px] rounded-full"
                      style={{
                        backgroundColor: colorConfig.hintColor,
                        color: colorConfig.mainColor,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModuleWrapper>
  );
}
