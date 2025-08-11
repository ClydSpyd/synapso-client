
import { IconType } from "react-icons/lib";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as aiIcons from "react-icons/ai";
import * as fiIcons from "react-icons/fi";
import * as hiIcons from "react-icons/hi";
import * as piIcons from "react-icons/pi";
import * as io5Icons from "react-icons/io5";

import {
  FaRunning,
  FaBiking,
  FaBook,
  FaAppleAlt,
  FaBed,
  FaDumbbell,
  FaHeartbeat,
  FaLaptopCode,
  FaMusic,
  FaSpa,
} from "react-icons/fa";

import {
  MdFitnessCenter,
  MdSelfImprovement,
  MdOutlineWaterDrop,
  MdWorkOutline,
  MdOutlineFastfood,
  MdOutlineAlarm,
  MdOutlineMood,
  MdOutlineSchool,
  MdOutlineLibraryBooks,
} from "react-icons/md";

import {
  AiOutlineSmile,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineFire,
  AiOutlineHeart,
  AiOutlineThunderbolt,
  AiOutlineEye,
  AiOutlineRead,
  AiOutlineCalendar,
  AiOutlineCoffee,
} from "react-icons/ai";

import {
  FiCheck,
  FiEdit,
  FiFeather,
  FiGlobe,
  FiSun,
  FiMoon,
  FiTarget,
  FiTrello,
  FiBox,
  FiDroplet,
} from "react-icons/fi";

import {
  HiOutlineClipboardList,
  HiOutlineEmojiHappy,
  HiOutlineUserGroup,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineAdjustments,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
} from "react-icons/hi";

export const defaultIconList = [
  { name: "FaRunning", IconComponent: FaRunning },
  { name: "FaBiking", IconComponent: FaBiking },
  { name: "FaBook", IconComponent: FaBook },
  { name: "FaAppleAlt", IconComponent: FaAppleAlt },
  { name: "FaBed", IconComponent: FaBed },
  { name: "FaDumbbell", IconComponent: FaDumbbell },
  { name: "FaHeartbeat", IconComponent: FaHeartbeat },
  { name: "FaLaptopCode", IconComponent: FaLaptopCode },
  { name: "FaMusic", IconComponent: FaMusic },
  { name: "FaSpa", IconComponent: FaSpa },

  { name: "MdFitnessCenter", IconComponent: MdFitnessCenter },
  { name: "MdSelfImprovement", IconComponent: MdSelfImprovement },
  { name: "MdOutlineWaterDrop", IconComponent: MdOutlineWaterDrop },
  { name: "MdWorkOutline", IconComponent: MdWorkOutline },
  { name: "MdOutlineFastfood", IconComponent: MdOutlineFastfood },
  { name: "MdOutlineAlarm", IconComponent: MdOutlineAlarm },
  { name: "MdOutlineMood", IconComponent: MdOutlineMood },
  { name: "MdOutlineSchool", IconComponent: MdOutlineSchool },
  { name: "MdOutlineLibraryBooks", IconComponent: MdOutlineLibraryBooks },

  { name: "AiOutlineSmile", IconComponent: AiOutlineSmile },
  { name: "AiOutlineClockCircle", IconComponent: AiOutlineClockCircle },
  { name: "AiOutlineCheckCircle", IconComponent: AiOutlineCheckCircle },
  { name: "AiOutlineFire", IconComponent: AiOutlineFire },
  { name: "AiOutlineHeart", IconComponent: AiOutlineHeart },
  { name: "AiOutlineThunderbolt", IconComponent: AiOutlineThunderbolt },
  { name: "AiOutlineEye", IconComponent: AiOutlineEye },
  { name: "AiOutlineRead", IconComponent: AiOutlineRead },
  { name: "AiOutlineCalendar", IconComponent: AiOutlineCalendar },
  { name: "AiOutlineCoffee", IconComponent: AiOutlineCoffee },

  { name: "FiCheck", IconComponent: FiCheck },
  { name: "FiEdit", IconComponent: FiEdit },
  { name: "FiFeather", IconComponent: FiFeather },
  { name: "FiGlobe", IconComponent: FiGlobe },
  { name: "FiSun", IconComponent: FiSun },
  { name: "FiMoon", IconComponent: FiMoon },
  { name: "FiTarget", IconComponent: FiTarget },
  { name: "FiTrello", IconComponent: FiTrello },
  { name: "FiBox", IconComponent: FiBox },
  { name: "FiDroplet", IconComponent: FiDroplet },

  { name: "HiOutlineClipboardList", IconComponent: HiOutlineClipboardList },
  { name: "HiOutlineEmojiHappy", IconComponent: HiOutlineEmojiHappy },
  { name: "HiOutlineUserGroup", IconComponent: HiOutlineUserGroup },
  { name: "HiOutlineLightBulb", IconComponent: HiOutlineLightBulb },
  { name: "HiOutlineChartBar", IconComponent: HiOutlineChartBar },
  { name: "HiOutlineAdjustments", IconComponent: HiOutlineAdjustments },
  { name: "HiOutlineBookOpen", IconComponent: HiOutlineBookOpen },
  { name: "HiOutlineCheckCircle", IconComponent: HiOutlineCheckCircle },
  { name: "HiOutlineRefresh", IconComponent: HiOutlineRefresh },
];

const allIcons = {
  ...FaIcons,
  ...MdIcons,
  ...aiIcons,
  ...fiIcons,
  ...hiIcons,
  ...io5Icons,
  ...piIcons,
};

export const iconList = Object.entries(allIcons).map(
  ([name, IconComponent]) => ({
    name,
    IconComponent,
  })
);

export function getIconByName(name: string): IconType | null {
  return (allIcons as Record<string, IconType>)[name] || null;
}
