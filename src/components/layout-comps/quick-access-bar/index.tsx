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
import AddHabitModal from "./modals/add-habit-modal";
import AddMovieModal from "./modals/add-movie-modal";
import AddQuoteModal from "./modals/add-quote-modal";
import AddBookModal from "./modals/add-book-modal";
import AddLinkModal from "./modals/add-link-modal";
import RegisterActivityModal from "./modals/register-activity-modal";
import { colorCombos } from "@/config/color-config";

export default function QuickAccessBar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div
      className={`relative h-full p-4 text-slate-500 font-semibold text-sm transition-all duration-300 ease-out ${
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
        <h1>QUICK ACTIONS</h1>
        <div
          className={cn("py-2 flex flex-col gap-2", {
            "pointer-events-none": !sidebarOpen,
          })}
        >
          <RegisterActivityModal>
            <QuickAccessItem
              text="Register Habit Activity"
              colorConfig={colorCombos[1]}
            >
              <FaRegCalendarCheck
                className="text-lg"
                style={{
                  color: colorCombos[1].mainColor,
                }}
              />
            </QuickAccessItem>
          </RegisterActivityModal>
          <AddHabitModal>
            <QuickAccessItem
              text="Add new Habit"
              colorConfig={colorCombos[1]}
            >
              <FaRegCalendarPlus
                className="text-lg"
                style={{
                  color: colorCombos[1].mainColor,
                }}
              />
            </QuickAccessItem>
          </AddHabitModal>
          <QuickAccessItem
            text="Record Idea"
            colorConfig={colorCombos[4]}
          >
            <FaLightbulb className="text-lg text-fuchsia-500" />
          </QuickAccessItem>
          <AddBookModal>
            <QuickAccessItem
              text="Wiki: Add Book"
              colorConfig={colorCombos[2]}
            >
              <FaBook
                className="text-lg"
                style={{
                  color: colorCombos[2].mainColor,
                }}
              />
            </QuickAccessItem>
          </AddBookModal>
          <AddQuoteModal>
            <QuickAccessItem
              text="Wiki: Add Quote"
              colorConfig={colorCombos[2]}
            >
              <TbQuoteFilled
                className="text-xl"
                style={{
                  color: colorCombos[2].mainColor,
                }}
              />
            </QuickAccessItem>
          </AddQuoteModal>
          <AddMovieModal>
            <QuickAccessItem
              text="Wiki: Add Movie/Series"
              colorConfig={colorCombos[2]}
            >
              <TbMovie
                className="text-xl"
                style={{
                  color: colorCombos[2].mainColor,
                }}
              />
            </QuickAccessItem>
          </AddMovieModal>
          <AddLinkModal>
            <QuickAccessItem
              text="Wiki: Add Link"
              colorConfig={colorCombos[2]}
            >
              <TbLink
                className="text-xl"
                style={{
                  color: colorCombos[2].mainColor,
                }}
              />
            </QuickAccessItem>
          </AddLinkModal>
          <QuickAccessItem
            text="Add Task"
            colorConfig={colorCombos[7]}
          >
            <MdPlaylistAdd className="text-2xl text-indigo-500" />
          </QuickAccessItem>
        </div>
      </div>
    </div>
  );
}
