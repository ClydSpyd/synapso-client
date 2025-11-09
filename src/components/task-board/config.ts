import {
  colorCombos,
  successColorCombo,
} from "@/config/color-config";
import { IconType } from "react-icons/lib";
import { FaInbox } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { PiPauseFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";

export interface Column {
  status: TaskStatus;
  title: string;
  colorConfig: ColorCombo;
  icon: IconType;
}

export const spaceExampleSYNAPSO: SpaceSummary = {
  id: "space-1",
  name: "SYNAPSO dev",
  description: "Space for SYNAPSO development brainstorming and task implementation",
  createdAt: new Date("2025-10-20T10:00:00.000Z"),
};

export const spaceExampleWELLBEING: SpaceSummary = {
  id: "space-2",
  name: "Wellbeing",
  description: "Space for wellbeing-related tasks and initiatives",
  createdAt: new Date("2025-10-20T10:00:00.000Z"),
};

export const COLUMNS: Column[] = [
  {
    status: "todo",
    title: "Pending",
    colorConfig: colorCombos[1],
    icon: FaInbox,
  },
  {
    status: "in-progress",
    title: "Active",
    colorConfig: colorCombos[5],
    icon: IoIosRocket,
  },
  {
    status: "blocked",
    title: "Waiting",
    colorConfig: colorCombos[3],
    icon: PiPauseFill,
  },
  {
    status: "done",
    title: "Completed",
    colorConfig: successColorCombo,
    icon: FaCircleCheck,
  },
];
