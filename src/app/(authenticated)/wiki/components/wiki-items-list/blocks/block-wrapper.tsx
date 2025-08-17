import { cn } from "@/lib/utils";
import { wikiItemsConfig } from "../../../config";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlinePushPin } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { Menu, Text } from '@mantine/core';
import { API } from "@/api";

export default function WikiBlockWrapper({
  type,
  id,
  iconClass,
  children,
}: {
  type: WikiType;
  id: string;
  iconClass?: string;
  children: React.ReactNode;
}) {
  const config = wikiItemsConfig[type];

  const handlePin = async () => {
    // Logic to pin the item
    console.log(`Pinning item of type: ${type}`);
    const payload: Partial<PinPayload> = {
      item_id: id,
      item_type: type,
    };

    const {data, error} = await API.wiki.pinned.add(payload);
    if (error) {
      console.error("Error pinning item:", error);
    }
    else {
      console.log("Item pinned successfully:", data);
    }
  };
  return (
    <div
      className="w-full rounded-lg px-8 py-4 min-h-[200px] flex flex-col relative"
      style={{ backgroundColor: config.accentColor }}
    >
      <div className="w-full flex items-start justify-start">
        <config.icon
          className={cn("text-3xl", iconClass ?? "")}
          style={{ color: config.mainColor }}
        />
        <div className="absolute top-4 right-3">
          <Menu
            withArrow
            styles={{
              dropdown: {
                backgroundColor: "#fff", // your color
                color: "#333",
              },
            }}
          >
            <Menu.Target>
              <HiDotsVertical
                className="text-md cursor-pointer"
                style={{ color: config.mainColor }}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={handlePin}
                leftSection={
                  <MdOutlinePushPin className="text-lg text-slate-500 cursor-pointer" />
                }
              >
                <Text size="xs">Pin to dash</Text>
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <MdDeleteForever className="text-lg text-slate-500 cursor-pointer" />
                }
              >
                <Text size="xs">Delete item</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
      {children}
    </div>
  );
}
