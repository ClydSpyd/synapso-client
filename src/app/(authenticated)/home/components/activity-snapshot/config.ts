// import { FaRunning } from "react-icons/fa";
// import { IoMdBicycle } from "react-icons/io";
// import { IoFootstepsSharp } from "react-icons/io5";
// import { IoFitnessSharp } from "react-icons/io5";
// import { GiWeightLiftingUp } from "react-icons/gi";
// import { FaWeightHanging } from "react-icons/fa6";
// import { MdSportsHandball } from "react-icons/md";
// import { MdFitnessCenter } from "react-icons/md";
// import { MdOutlineSportsTennis } from "react-icons/md";
// import { MdOutlineSportsSoccer } from "react-icons/md";
// import { TbStretching } from "react-icons/tb";
// import { GrYoga } from "react-icons/gr";
// import { RiMentalHealthFill } from "react-icons/ri";
// import { IconType } from "react-icons/lib";
import { colorCombos } from "@/config/color-config";


export const activityTypes: { value: ActivityType; label: string }[] = [
  { value: "cardio", label: "Cardio" },
  {
    value: "strength",
    label: "Strength",
  },
  {
    value: "sport",
    label: "Sport",
  },
  {
    value: "recovery",
    label: "Recovery",
  },
  {
    value: "mind_body",
    label: "Mind & Body",
  },
  {
    value: "mobility",
    label: "Mobility",
  },
  {
    value: "conditioning",
    label: "Conditioning",
  },
];

export const activityColorOptions : ColorCombo[] = [
  colorCombos[0],
  colorCombos[1],
  colorCombos[3],
  colorCombos[6],
  colorCombos[4],
  colorCombos[7],
]

export const dummyActivityEntries: ActivityEntry[] = [
  {
    title: "Morning Run",
    type: "cardio",
    time: "06:30",
    duration: 30,
    icon: "FaRunning",
    colorConfig: 0,
    distance: 5,
    location: "Parque Del Oeste",
    kcals: 300,
  },
  {
    title: "Evening Yoga",
    type: "mind_body",
    time: "18:00",
    duration: 45,
    icon: "GrYoga",
    location: "Enforma 24/7",
    colorConfig: 1,
  },
  // {
  //   title: "Strength Training",
  //   type: "strength",
  //   time: "19:00",
  //   duration: 60,
  //   icon: "MdFitnessCenter",
  //   location: "Enforma 24/7",
  //   colorConfig: 3,
  //   kcals: 400,
  // },
];
