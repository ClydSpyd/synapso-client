import { activityColorOptions, activityIcons, activityTypes } from "./config";
import { SlLocationPin } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa6";
import { FaFireFlameCurved } from "react-icons/fa6";
import { getIconByName } from "@/components/icon-picker/icon-list";

export default function ActivityListItem({
  item,
  idx,
}: {
  item: ActivityEntry;
  idx: number;
}) {
  const EntryIcon = getIconByName(item.icon)!;
  const colorCofig: ColorCombo =
    activityColorOptions[idx % activityColorOptions.length];

  const getAmPm = (time: string) => {
    const [hourStr] = time.split(":");
    const hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    return ampm;
  };

  return (
    <div
      className="w-full flex justify-between items-center p-4"
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

      {/* DISTANCE or DURATION BLOCK */}
      <div>
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
          <p className="text-sm" style={{ color: colorCofig.mainColor + "90" }}>
            {item.duration} min
          </p>
        )}
      </div>
    </div>
  );
}