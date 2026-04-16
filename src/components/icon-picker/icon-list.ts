
import { IconType } from "react-icons/lib";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as aiIcons from "react-icons/ai";
import * as fiIcons from "react-icons/fi";
import * as hiIcons from "react-icons/hi";
import * as piIcons from "react-icons/pi";
import * as io5Icons from "react-icons/io5";

import { IoFootstepsSharp, IoFitnessSharp } from "react-icons/io5";
import { GiWeightLiftingUp, GiMountainClimbing, GiAcrobatic, GiJumpingDog } from "react-icons/gi";
import { IoMdBicycle } from "react-icons/io";
import { TbStretching, TbSkateboarding } from "react-icons/tb";
import { GrYoga } from "react-icons/gr";
import { RiMentalHealthFill } from "react-icons/ri";

export const defaultIconList = [
  { name: "FaRunning", IconComponent: FaIcons.FaRunning },
  { name: "FaBiking", IconComponent: FaIcons.FaBiking },
  { name: "FaBook", IconComponent: FaIcons.FaBook },
  { name: "FaAppleAlt", IconComponent: FaIcons.FaAppleAlt },
  { name: "FaBed", IconComponent: FaIcons.FaBed },
  { name: "FaDumbbell", IconComponent: FaIcons.FaDumbbell },
  { name: "FaHeartbeat", IconComponent: FaIcons.FaHeartbeat },
  { name: "FaLaptopCode", IconComponent: FaIcons.FaLaptopCode },
  { name: "FaMusic", IconComponent: FaIcons.FaMusic },
  { name: "FaSpa", IconComponent: FaIcons.FaSpa },

  { name: "MdFitnessCenter", IconComponent: MdIcons.MdFitnessCenter },
  { name: "MdSelfImprovement", IconComponent: MdIcons.MdSelfImprovement },
  { name: "MdOutlineWaterDrop", IconComponent: MdIcons.MdOutlineWaterDrop },
  { name: "MdWorkOutline", IconComponent: MdIcons.MdWorkOutline },
  { name: "MdOutlineFastfood", IconComponent: MdIcons.MdOutlineFastfood },
  { name: "MdOutlineAlarm", IconComponent: MdIcons.MdOutlineAlarm },
  { name: "MdOutlineMood", IconComponent: MdIcons.MdOutlineMood },
  { name: "MdOutlineSchool", IconComponent: MdIcons.MdOutlineSchool },
  { name: "MdOutlineLibraryBooks", IconComponent: MdIcons.MdOutlineLibraryBooks },

  { name: "AiOutlineSmile", IconComponent: aiIcons.AiOutlineSmile },
  { name: "AiOutlineClockCircle", IconComponent: aiIcons.AiOutlineClockCircle },
  { name: "AiOutlineCheckCircle", IconComponent: aiIcons.AiOutlineCheckCircle },
  { name: "AiOutlineFire", IconComponent: aiIcons.AiOutlineFire },
  { name: "AiOutlineHeart", IconComponent: aiIcons.AiOutlineHeart },
  { name: "AiOutlineThunderbolt", IconComponent: aiIcons.AiOutlineThunderbolt },
  { name: "AiOutlineEye", IconComponent: aiIcons.AiOutlineEye },
  { name: "AiOutlineRead", IconComponent: aiIcons.AiOutlineRead },
  { name: "AiOutlineCalendar", IconComponent: aiIcons.AiOutlineCalendar },
  { name: "AiOutlineCoffee", IconComponent: aiIcons.AiOutlineCoffee },

  { name: "FiCheck", IconComponent: fiIcons.FiCheck },
  { name: "FiEdit", IconComponent: fiIcons.FiEdit },
  { name: "FiFeather", IconComponent: fiIcons.FiFeather },
  { name: "FiGlobe", IconComponent: fiIcons.FiGlobe },
  { name: "FiSun", IconComponent: fiIcons.FiSun },
  { name: "FiMoon", IconComponent: fiIcons.FiMoon },
  { name: "FiTarget", IconComponent: fiIcons.FiTarget },
  { name: "FiTrello", IconComponent: fiIcons.FiTrello },
  { name: "FiBox", IconComponent: fiIcons.FiBox },
  { name: "FiDroplet", IconComponent: fiIcons.FiDroplet },

  { name: "HiOutlineClipboardList", IconComponent: hiIcons.HiOutlineClipboardList },
  { name: "HiOutlineEmojiHappy", IconComponent: hiIcons.HiOutlineEmojiHappy },
  { name: "HiOutlineUserGroup", IconComponent: hiIcons.HiOutlineUserGroup },
  { name: "HiOutlineLightBulb", IconComponent: hiIcons.HiOutlineLightBulb },
  { name: "HiOutlineChartBar", IconComponent: hiIcons.HiOutlineChartBar },
  { name: "HiOutlineAdjustments", IconComponent: hiIcons.HiOutlineAdjustments },
  { name: "HiOutlineBookOpen", IconComponent: hiIcons.HiOutlineBookOpen },
  { name: "HiOutlineCheckCircle", IconComponent: hiIcons.HiOutlineCheckCircle },
  { name: "HiOutlineRefresh", IconComponent: hiIcons.HiOutlineRefresh },
];

const allIcons = {
  ...FaIcons,
  ...MdIcons,
  ...aiIcons,
  ...fiIcons,
  ...hiIcons,
  ...io5Icons,
  ...piIcons,
  IoFitnessSharp,
  IoFootstepsSharp,
  GiWeightLiftingUp,
  IoMdBicycle,
  TbStretching,
  GrYoga,
  RiMentalHealthFill,
  GiAcrobatic,
  TbSkateboarding,
  GiJumpingDog,
  GiMountainClimbing,
};

export const activityIconList = [
  { name: "IoFootstepsSharp", IconComponent: IoFootstepsSharp },
  { name: "IoFitnessSharp", IconComponent: IoFitnessSharp },
  { name: "GiWeightLiftingUp", IconComponent: GiWeightLiftingUp },
  { name: "FaWeightHanging", IconComponent: FaIcons.FaWeightHanging },
  { name: "IoMdBicycle", IconComponent: IoMdBicycle },
  { name: "PiMountainsBold", IconComponent: piIcons.PiMountainsBold },
  { name: "TbStretching", IconComponent: TbStretching },
  { name: "TbSkateboarding", IconComponent: TbSkateboarding },
  { name: "GrYoga", IconComponent: GrYoga },
  { name: "GiAcrobatic", IconComponent: GiAcrobatic },
  { name: "RiMentalHealthFill", IconComponent: RiMentalHealthFill },
  { name: "FaRunning", IconComponent: FaIcons.FaRunning },
  { name: "MdSportsHandball", IconComponent: MdIcons.MdSportsHandball },
  { name: "GiJumpingDog", IconComponent: GiJumpingDog },
  { name: "MdFitnessCenter", IconComponent: MdIcons.MdFitnessCenter },
  {
    name: "MdOutlineSportsTennis",
    IconComponent: MdIcons.MdOutlineSportsTennis,
  },
  {
    name: "MdOutlineSportsSoccer",
    IconComponent: MdIcons.MdOutlineSportsSoccer,
  },
  { name: "FaDog", IconComponent: FaIcons.FaDog },
  { name: "GiMountainClimbing", IconComponent: GiMountainClimbing },
  { name: "FaSkiing", IconComponent: FaIcons.FaSkiing },
  { name: "PiBoxingGloveBold", IconComponent: piIcons.PiBoxingGloveBold },
];

export const iconList = Object.entries(allIcons).map(
  ([name, IconComponent]) => ({
    name,
    IconComponent,
  })
);

export function getIconByName(name: string): IconType | null {
  return (allIcons as Record<string, IconType>)[name] || null;
}
