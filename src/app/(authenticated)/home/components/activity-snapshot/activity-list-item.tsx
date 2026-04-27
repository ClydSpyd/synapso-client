import { activityColorOptions, activityTypes } from "./config";
import { SlLocationPin } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa6";
import { FaFireFlameCurved } from "react-icons/fa6";
import { getIconByName } from "@/components/icon-picker/icon-list";
import { Menu, Text } from "@mantine/core";
import { BiDotsVertical } from "react-icons/bi";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useModalStore } from "@/stores/modal-store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useActivitySnapshot } from "@/queries/useActivitySnapshot";
import { API } from "@/api";

export default function ActivityListItem({
  item,
  idx,
  date
}: {
  item: ActivityEntry;
  idx: number;
  date: string;
}) {
  const { open } = useModalStore();
  const { refetch } = useActivitySnapshot(date);
  const [confState, setConfState] = useState(false);
  const EntryIcon = getIconByName(item.icon)!;
  const colorCofig: ColorCombo =
    activityColorOptions[idx % activityColorOptions.length];

  const getAmPm = (time: string) => {
    const [hourStr] = time.split(":");
    const hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    return ampm;
  };

  const handleDelete = async() => {
    await API.activitySnapshot.delete(item.id!);
    refetch();
  }

  return (
    <div
      className="w-full flex justify-between items-center p-4 relative"
      style={{
        backgroundColor: colorCofig.accentColor + "20",
        borderRadius: "8px",
        border: `2px solid ${colorCofig.accentColor}`,
      }}
    >
      <div className="flex gap-4">
        {/* ICON BLOCK  */}
        <div
          className="h-15 w-15 flex items-center justify-center rounded-lg"
          style={{
            backgroundColor: colorCofig.hintColor,
            border: `1px solid ${colorCofig.mainColor}`,
          }}
        >
          <EntryIcon size={30} color={colorCofig.mainColor} />
        </div>

        {/* TITLE & INFO BLOCK */}
        <div className="h-full flex flex-col justify-center gap-2">
          <h2 className="font-semibold text-lg text-slate-700 flex items-center gap-2">
            {item.title}{" "}
            <span
              className="rounded-2xl px-2 py-[2px] text-sm font-normal"
              style={{
                backgroundColor: colorCofig.accentColor,
                color: colorCofig.mainColor,
              }}
            >
              {activityTypes.find((type) => type.value === item.type)?.label}
            </span>
          </h2>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <FaRegClock size={14} color={colorCofig.mainColor} />
              <p
                className="text-sm m-0 tracking-tight"
                style={{ color: colorCofig.mainColor }}
              >
                {item.time} {getAmPm(item.time)}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <SlLocationPin size={14} color={colorCofig.mainColor} />
              <p
                className="text-sm m-0"
                style={{ color: colorCofig.mainColor }}
              >
                {item.location}
              </p>
            </div>
            {item.kcals && (
              <div className="flex gap-1 items-center">
                <FaFireFlameCurved size={14} color={colorCofig.mainColor} />
                <p
                  className="text-sm m-0"
                  style={{ color: colorCofig.mainColor }}
                >
                  {item.kcals} kcals
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {/* DISTANCE or DURATION BLOCK */}
        <div className="flex flex-col items-end">
          <h4
            className="text-3xl font-bold"
            style={{ color: colorCofig.mainColor }}
          >
            {item.distance ?? item.duration}{" "}
            <span className="ml-[-2px] text-sm">
              {item.distance ? "km" : "min"}
            </span>
          </h4>
          {item.distance && (
            <p
              className="text-sm"
              style={{ color: colorCofig.mainColor + "90" }}
            >
              {item.duration} min
            </p>
          )}
        </div>
        <Menu trigger="click">
          <Menu.Target>
            <div className="h-[30px] w-[30px] rounded-sm flex items-center justify-center cursor-pointer">
              <BiDotsVertical className="text-slate-400" size={18} />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() =>
                open({
                  type: "activity_snapshot",
                  title: "Edit Activity Entry",
                  payload: item,
                  modalStyles: {
                    content: {
                      maxWidth: "600px",
                      width: "600px",
                      minWidth: "600px",
                    },
                  },
                })
              }
              leftSection={
                <MdEdit className="text-lg text-slate-700 cursor-pointer" />
              }
            >
              <Text size="xs">Edit item</Text>
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
      </div>

      {/* delete confirmation state */}
      <div
        className={cn(
          "absolute w-full h-full backdrop-blur-md bg-gray-200/10 flex flex-col gap-2 transition-all ease-in-out duration-200 left-0 items-center justify-center z-20",
          confState
            ? "bottom-0 opacity-100 pointer-events-auto"
            : "bottom-1/3 opacity-0 pointer-events-none",
        )}
      >
        <p className="text-sm text-slate-500 font-semibold">Are you sure?</p>
        <div className="flex gap-2">
          <button
            onClick={() => setConfState(false)}
            className="px-2 py-1 bg-slate-200 rounded-md !text-sm font-semibold cursor-pointer text-slate-700 border border-gray-400"
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
  );
}