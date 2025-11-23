import { FaList } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { FaListCheck } from "react-icons/fa6";
import { BsJournalText } from "react-icons/bs";

export const modules: SpaceModule[] = [
  {
    type: "list",
    title: "List Block",
    description:
      "Create lists of your atomic elements - movies, books, links, quotes etc.",
    icon: FaList,
    iconSize: 18,
  },
  {
    type: "log",
    title: "Journal/log",
    description:
      "Record daily thoughts, reflections, or log specific activities with timestamps.",
    icon: BsJournalText,
    iconSize: 22,
  },
  {
    type: "tasks",
    title: "Task Board",
    description: "Manage your actionable items related to this space.",
    icon: BiTask,
    iconSize: 24,
  },
  {
    type: "habits",
    title: "Habits Block",
    description:
      "Track recurring habits, streaks, and consistency. Visualize your progress over time.",
    icon: FaListCheck,
    iconSize: 18,
  },
];