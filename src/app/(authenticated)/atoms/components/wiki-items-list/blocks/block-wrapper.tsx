import { cn } from "@/lib/utils";
import { wikiItemsConfig } from "../../../config";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlinePushPin } from "react-icons/md";
import { PiPushPinSlashLight } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { Menu, Text } from '@mantine/core';
import { API } from "@/api";
import { useQueryClient } from "@tanstack/react-query";

export default function WikiBlockWrapper({
  type,
  pinId,
  itemId,
  iconClass,
  children,
  pinned,
}: {
  type: WikiType;
  pinId: string;
  itemId: string;
  iconClass?: string;
  children: React.ReactNode;
  pinned?: boolean;
}) {
  const config = wikiItemsConfig[type];
  const queryClient = useQueryClient();
  const handlePin = async () => {
    console.log(`${pinned ? "unpinning" : "pinning"} item of type: ${type}`);
    const payload: Partial<PinPayload> = {
      item_id: itemId,
      item_type: type,
    };

    let data, error;

    if (pinned) {
      const deleteRes = await API.pinned.delete(pinId);
      data = deleteRes.data;
      error = deleteRes.error;
    } else {
      const addRes = await API.pinned.add(payload);
      data = addRes.data;
      error = addRes.error;
    }

    if (error) {
      console.error("Error pinning item:", error);
    } else {
      console.log("Item pinned successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["pinned-items"] });
    }
  };
  return (
    <div
      id={`pin_${pinId}`}
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
                  pinned ? (
                    <PiPushPinSlashLight className="text-lg text-slate-500 cursor-pointer" />
                  ) : (
                    <MdOutlinePushPin className="text-lg text-slate-500 cursor-pointer" />
                  )
                }
              >
                <Text size="xs">{pinned ? "Unpin" : "Pin to dash"}</Text>
              </Menu.Item>
              {!pinned && (
                <Menu.Item
                  leftSection={
                    <MdDeleteForever className="text-lg text-slate-500 cursor-pointer" />
                  }
                >
                  <Text size="xs">Delete item</Text>
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
      {children}
    </div>
  );
}
