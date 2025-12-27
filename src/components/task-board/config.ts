import { colorCombos, successColorCombo } from "@/config/color-config";
import { IconType } from "react-icons/lib";
import { FaInbox, FaRegFolderOpen, FaRegStar } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { PiPauseFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { LiaTelegramPlane } from "react-icons/lia";
import { FiClock } from "react-icons/fi";

interface ColumnPlaceholder {
  title: string;
  description: string;
  icon: IconType;
}
export interface Column {
  status: TaskStatus;
  title: string;
  colorConfig: ColorCombo;
  icon: IconType;
  placeholder: ColumnPlaceholder;
}

export const spaceExampleSYNAPSO: SpaceSummary = {
  id: "space-1",
  title: "SYNAPSO dev",
  description:
    "Space for SYNAPSO development brainstorming and task implementation",
  createdAt: new Date("2025-10-20T10:00:00.000Z"),
};

export const spaceExampleWELLBEING: SpaceSummary = {
  id: "space-2",
  title: "Wellbeing",
  description: "Space for wellbeing-related tasks and initiatives",
  createdAt: new Date("2025-10-20T10:00:00.000Z"),
};

export const COLUMNS: Column[] = [
  {
    status: "todo",
    title: "Pending",
    colorConfig: colorCombos[5],
    icon: FaInbox,
    placeholder: {
      title: "To do",
      description: "Drop items here or click 'add item'",
      icon: FaRegFolderOpen,
    },
  },
  {
    status: "in-progress",
    title: "Active",
    colorConfig: colorCombos[3],
    icon: IoIosRocket,
    placeholder: {
      title: "Under way",
      description: "Drop items here to start working on them",
      icon: LiaTelegramPlane,
    },
  },
  {
    status: "blocked",
    title: "Waiting",
    colorConfig: colorCombos[1],
    icon: PiPauseFill,
    placeholder: {
      title: "On hold",
      description: "Drop items here that are currently blocked",
      icon: FiClock,
    },
  },
  {
    status: "done",
    title: "Completed",
    colorConfig: successColorCombo,
    icon: FaCircleCheck,
    placeholder: {
      title: "All done!",
      description: "Drop items here that have been completed",
      icon: FaRegStar,
    },
  },
];
