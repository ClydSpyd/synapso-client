import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  FaChevronCircleRight,
  FaLightbulb,
  FaRegCalendarCheck,
  FaRegCalendarPlus,
} from "react-icons/fa";

import { FaBook } from "react-icons/fa6";
import { TbLink, TbMovie, TbQuoteFilled } from "react-icons/tb";
import { MdPlaylistAdd } from "react-icons/md";
import QuickAccessItem from "./quick-access-item";
import AddHabbbitModal from "./modals/add-habit-modal";
import AddMovieModal from "./modals/add-movie-modal";

export default function QuickAccessBar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div
      className={`relative h-full border-r border-gray-200/80 p-4 text-slate-500 font-semibold text-sm transition-all duration-300 ease-out ${
        sidebarOpen ? "w-[250px]" : "w-0"
      }`}
    >
      <div
        onClick={() => setSidebarOpen((prev: boolean) => !prev)}
        className="h-5 w-5 vert-center right-[-10px] cursor-pointer flex items-center justify-center"
      >
        <FaChevronCircleRight
          className={`text-lg text-slate-300 transition-transform duration-500 ease-in-out bg-white rounded-full ${
            sidebarOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={cn(
          `overflow-hidden whitespace-nowrap px-2 duration-200 transition-opacity`,
          sidebarOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <h1>QUICK ACCESS</h1>
        <div className="py-2 flex flex-col gap-2">
          <QuickAccessItem
            text="Register Habit Activity"
            accentColor="#432dd7"
            hoverColor="var(--accent-light-two)"
          >
            <FaRegCalendarCheck className="text-lg text-indigo-700" />
          </QuickAccessItem>
          <AddHabbbitModal>
            <QuickAccessItem
              text="Add new Habit"
              accentColor="#432dd7"
              hoverColor="var(--accent-light-two)"
            >
              <FaRegCalendarPlus className="text-lg text-indigo-700" />
            </QuickAccessItem>
          </AddHabbbitModal>
          <QuickAccessItem
            text="Record Idea"
            accentColor="#e12afb"
            hoverColor="var(--accent-light-one)"
          >
            <FaLightbulb className="text-lg text-fuchsia-500" />
          </QuickAccessItem>
          <QuickAccessItem
            text="Wiki: Add Book"
            accentColor="#26bebe"
            hoverColor="var(--accent-light-three)"
          >
            <FaBook className="text-lg text-cyan-500" />
          </QuickAccessItem>
          <QuickAccessItem
            text="Wiki: Add Quote"
            accentColor="#26bebe"
            hoverColor="var(--accent-light-three)"
          >
            <TbQuoteFilled className="text-xl text-cyan-500" />
          </QuickAccessItem>
          <AddMovieModal>
            <QuickAccessItem
              text="Wiki: Add Movie/Series"
              accentColor="#26bebe"
              hoverColor="var(--accent-light-three)"
            >
              <TbMovie className="text-xl text-cyan-500" />
            </QuickAccessItem>
          </AddMovieModal>
          <QuickAccessItem
            text="Wiki: Add Link"
            accentColor="#26bebe"
            hoverColor="var(--accent-light-three)"
          >
            <TbLink className="text-xl text-cyan-500" />
          </QuickAccessItem>
          <QuickAccessItem
            text="Add Task"
            accentColor="#615fff"
            hoverColor="var(--accent-light-four)"
          >
            <MdPlaylistAdd className="text-2xl text-indigo-500" />
          </QuickAccessItem>
        </div>
      </div>
    </div>
  );
}
