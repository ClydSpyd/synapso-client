import { API } from "@/api";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { cn, getTagColorConfig } from "@/lib/utils";
import { useIdeas } from "@/queries/useIdeas";
import { Menu, Text } from "@mantine/core";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { CgPlayListAdd } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import { LuCalendarPlus } from "react-icons/lu";
import { useClickOutside } from '@mantine/hooks';
import { getTimeAgoString } from "@/lib/dates";
import { useRouter } from "next/navigation";
import { colorCombos } from "@/config/color-config";

export default function IdeaListItem({
  idea,
  idx
}: {
  idea: Idea;
  idx: number;
}) {
  const [confState, setConfState] = useState<boolean>(false);
  const { refetch } = useIdeas();
  const router = useRouter();

  const ref = useClickOutside(() => setConfState(false));

  const handleDelete = async () => {
    await API.ideas.delete(idea.id);
    refetch();
  };
  const moduleColorConf = colorCombos[idx % colorCombos.length];

  return (
    <StaggerContainer staggerDelay={0} randomFactor={50}>
      <div
        ref={ref}
        className="p-3 border-gray-200 rounded-lg flex justify-between items-between relative overflow-hidden bg-white h-full"
        style={{
          backgroundColor: moduleColorConf.hintColor + "60",
          border: `2px solid ${moduleColorConf.accentColor}`,
        }}
      >
        <div className="grow flex flex-col justify-between gap-2">
          <p className="text-base font-semibold text-slate-500">
            {idea.title}
          </p>
          <div className="flex gap-2 mt-2">
            {idea.tags.map((tag, idx) => {
              const colorConfig = getTagColorConfig(tag.toLowerCase());
              return (
                <span
                  key={idx}
                  className="text-xs px-2 py-[2px] rounded-full"
                  style={{
                    backgroundColor: colorConfig.accentColor,
                    color: colorConfig.mainColor,
                  }}
                >
                  {tag.toLowerCase()}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col h-full justify-between items-end">
          <Menu withArrow>
            <Menu.Target>
              <HiDotsVertical
                size={18}
                className="cursor-pointer text-slate-500"
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  router.push(
                    `/habits?newTitle=${encodeURIComponent(
                      idea.title
                    )}&ideaId=${idea.id}`
                  );
                }}
                leftSection={
                  <LuCalendarPlus className="text-lg text-slate-700 cursor-pointer" />
                }
              >
                <Text size="xs">Make Habit</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  router.push(
                    `/tasks?newTitle=${encodeURIComponent(idea.title)}&ideaId=${
                      idea.id
                    }`
                  );
                }}
                leftSection={
                  <CgPlayListAdd className="text-lg text-slate-700 cursor-pointer" />
                }
              >
                <Text size="xs">Make Action</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => setConfState(true)}
                leftSection={
                  <MdDeleteForever className="text-lg text-slate-700 cursor-pointer" />
                }
              >
                <Text size="xs">Delete item</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <p className="text-xs text-gray-400 font-medium whitespace-nowrap">
            {getTimeAgoString(new Date(idea.createdAt))}
          </p>
        </div>

        {/* delete confirmation state */}
        <div
          className={cn(
            "absolute w-full h-full backdrop-blur-md bg-gray-200/10 flex flex-col gap-2 transition-all ease-in-out duration-200 left-0 items-center justify-center z-20",
            confState
              ? "bottom-0 opacity-100 pointer-events-auto"
              : "bottom-1/3 opacity-0 pointer-events-none"
          )}
        >
          <p className="text-sm text-slate-500 font-semibold">Are you sure?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfState(false)}
              className="px-2 py-1 bg-slate-200 rounded-md !text-sm font-semibold cursor-pointer text-slate-700"
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
      </div>
    </StaggerContainer>
  );
}
