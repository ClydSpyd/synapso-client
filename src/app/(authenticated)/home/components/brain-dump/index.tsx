import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { colorCombos } from "@/config/color-config";
import { useIdeas } from "@/queries/useIdeas";
import { IoMdCloudUpload } from "react-icons/io";
import IdeaInput from "./idea-input";
import IdeaListItem from "./idea-list-item";
import IdeaFilters from "./idea-filters";
import { useEffect, useState } from "react";

export default function BrainDump() {
  const { data: items } = useIdeas();
  const [displayItems, setDisplayItems] = useState<Idea[] | undefined>(items);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  // const allTags = items?.reduce((acc: string[], idea) => {
  //   idea.tags.forEach((tag) => {
  //     if (!acc.includes(tag)) {
  //       acc.push(tag);
  //     }
  //   });
  //   return acc;
  // }, []) || [];

  useEffect(() => {
    const sortItems = (order: SortOrder) => {
      const key: keyof Idea = ["az", "za"].includes(order)
        ? "title"
        : "createdAt";
      const ascOrder = ["az", "asc"].includes(order);

      const sorted = items?.slice().sort((a, b) => {
        if (key === "title") {
          return ascOrder
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else {
          const aValue =
            typeof a.createdAt === "string"
              ? Date.parse(a.createdAt)
              : +a.createdAt;
          const bValue =
            typeof b.createdAt === "string"
              ? Date.parse(b.createdAt)
              : +b.createdAt;
          return ascOrder ? aValue - bValue : bValue - aValue;
        }
      });
      setDisplayItems(sorted);
    };

    sortItems(sortOrder);
  }, [items, sortOrder]);

  const moduleColorConf = colorCombos[1];
  return (
    <ModuleWrapper>
      {/* header section  */}
      <div className="flex gap-2">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-lg"
          style={{
            backgroundColor: moduleColorConf.hintColor,
            color: moduleColorConf.mainColor,
          }}
        >
          <IoMdCloudUpload size={27} />
        </div>
        <div className="grow">
          <h1 className="font-semibold text-slate-500">Idea Cloud</h1>
          <p className="text-xs text-slate-400/60">
            Float your thoughts + ideas here and develop them further later
          </p>
        </div>
      </div>
      <div className="my-4 flex flex-col gap-3">
        {/* filters section  */}
        <IdeaFilters
          setDisplayItems={setDisplayItems}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
        />

        {/* list section  */}
        <div className="flex flex-col gap-2">
          {displayItems?.map((item: Idea) => (
            <IdeaListItem key={item.id} idea={item} />
          ))}
        </div>

        {/* input section  */}
        <IdeaInput />
      </div>
    </ModuleWrapper>
  );
}
