import { FaRunning } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa6";
import { MdFitnessCenter } from "react-icons/md";
import { IoFitnessSharp } from "react-icons/io5";
import { MdSportsHandball } from "react-icons/md";
import { MdOutlineSportsTennis } from "react-icons/md";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { TbStretching } from "react-icons/tb";
import { GrYoga } from "react-icons/gr";
import { RiMentalHealthFill } from "react-icons/ri";
import { IoMdBicycle } from "react-icons/io";
import { IconType } from "react-icons/lib";

export const activityIcons: { [key: string]: IconType } = {
  running: FaRunning,
  walking: IoFootstepsSharp,
  strength: GiWeightLiftingUp,
  weightlifting: FaWeightHanging,
  fitness: MdFitnessCenter,
  crossfit: IoFitnessSharp,
  sport: MdSportsHandball,
  tennis: MdOutlineSportsTennis,
  soccer: MdOutlineSportsSoccer,
  mobility: TbStretching,
  yoga: GrYoga,
  mind_body: RiMentalHealthFill,
  biking: IoMdBicycle,
};

export const activityTypes = [
  "Cardio",
  "Strength",
  "Sport",
  "Mobility",
  "Recovery",
  "Conditioning",
  "Mind & Body",
];

export interface ActivityEntry {
  title: string;
  type: string;
  time: string; // 24-hour format, e.g. "14:30"
  duration: number; // in minutes
  icon: keyof typeof activityIcons; // icon
  colorConfig: number; // index for colorCombos
  distance?: number; // in kilometers, for cardio/sport activities
  location?: string;
  kcals?: number;
}

export const dummyActivityEntries: ActivityEntry[] = [
  {
    title: "Morning Run",
    type: "Cardio",
    time: "06:30",
    duration: 30,
    icon: "running",
    colorConfig: 0,
    distance: 5,
    location: "Parque Del Oeste",
    kcals: 300,
  },
  {
    title: "Evening Yoga",
    type: "Mind & Body",
    time: "18:00",
    duration: 45,
    icon: "yoga",
    location: "Enforma 24/7",
    colorConfig: 1,
  },
  {
    title: "Strength Training",
    type: "Strength",
    time: "19:00",
    duration: 60,
    icon: "fitness",
    location: "Enforma 24/7",
    colorConfig: 3,
    kcals: 400,
  },
];
