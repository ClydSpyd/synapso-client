import { useIdeas } from "@/queries/useIdeas";
import { Menu, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { BiSortAlt2, BiSortAZ, BiSortDown, BiSortUp } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

const SortMenuItem = ({
  Icon,
  text,
  callback,
  selected,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  callback: (_: SortOrder) => void;
  selected: boolean;
}) => (
  <Menu.Item
    onClick={() => callback("asc")}
    // className={cn(selected ? "border border-red-500" : "")}
    style={
      selected
        ? {
            border: "1px solid var(--accent-light-five)"
          }
        : {}
    }
    leftSection={<Icon className="text-md text-slate-400 cursor-pointer" />}
  >
    <p className="text-xs text-slate-400">{text}</p>
  </Menu.Item>
);

export default function IdeaFilters({
  setDisplayItems,
  sortOrder,
  setSortOrder,
}: {
  setDisplayItems: Dispatch<SetStateAction<Idea[] | undefined>>;
  sortOrder: SortOrder;
  setSortOrder: Dispatch<SetStateAction<SortOrder>>;
}) {
  const { data: items } = useIdeas();

  const handleTextInput = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const payload =
        items?.filter(
          (i: Idea) =>
            i.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            i.tags.join(",").toLowerCase().includes(e.target.value)
        ) ?? [];
      setDisplayItems(payload);
    },
    500
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="rounded-md border border-gray-200 flex items-center h-[40px] w-full px-2">
          <IoSearch className="text-gray-300 text-2xl" />
          <TextInput
            onChange={handleTextInput}
            className="w-full"
            placeholder="Search ideas..."
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
        <Menu offset={0} withArrow>
          <Menu.Target>
            <div className="flex gap-2 items-center justify-center border border-gray-200 rounded-sm w-[150px] cursor-pointer">
              <BiSortAlt2 size={18} className="cursor-pointer text-slate-400" />
              <p className="text-sm font-semibold text-gray-400">Sort items</p>
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <SortMenuItem
              selected={sortOrder === "desc"}
              callback={() => setSortOrder("desc")}
              Icon={BiSortDown}
              text="Newest First"
            />
            <SortMenuItem
              selected={sortOrder === "asc"}
              callback={() => setSortOrder("asc")}
              Icon={BiSortUp}
              text="Oldest First"
            />
            <SortMenuItem
              selected={sortOrder === "az"}
              callback={() => setSortOrder("az")}
              Icon={BiSortAZ}
              text="A-Z"
            />
            <SortMenuItem
              selected={sortOrder === "za"}
              callback={() => setSortOrder("za")}
              Icon={BiSortAZ}
              text="Z-A"
            />
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}
