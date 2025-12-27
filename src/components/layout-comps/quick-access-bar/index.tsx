import { cn } from "@/lib/utils";
import {
  FaChevronCircleRight,
  FaRegCalendarCheck,
  FaRegCalendarPlus,
} from "react-icons/fa";

import { FaBook } from "react-icons/fa6";
import { TbLink, TbMovie, TbQuoteFilled } from "react-icons/tb";
import { MdPlaylistAdd } from "react-icons/md";
import QuickAccessItem from "./quick-access-item";
import RegisterActivityModal from "./modals/register-activity-modal";
import { colorCombos } from "@/config/color-config";
import { IoMdCloudUpload } from "react-icons/io";
import AddIdeaModal from "./modals/add-idea-modal";
import useLocalStorage from "@/hooks/use-local-storage";
import { useModalStore } from "@/stores/modal-store";

export default function QuickAccessBar() {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    "synapso_bar_state",
    true
  );
  const { open } = useModalStore();

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
          <QuickAccessItem
            text="Add new Habit"
            colorConfig={colorCombos[1]}
            onClick={() =>
              open({
                title: "Add Habit",
                type: "habit",
              })
            }
          >
            <FaRegCalendarPlus
              className="text-lg"
              style={{
                color: colorCombos[1].mainColor,
              }}
            />
          </QuickAccessItem>
          <QuickAccessItem
            onClick={() => open({ title: "Add Book", type: "atom_book" })}
            text="Atom: Book"
            colorConfig={colorCombos[3]}
          >
            <FaBook
              className="text-lg"
              style={{
                color: colorCombos[3].mainColor,
              }}
            />
          </QuickAccessItem>
          <QuickAccessItem
            onClick={() => open({ title: "Add Quote", type: "atom_quote" })}
            text="Atom: Quote"
            colorConfig={colorCombos[3]}
          >
            <TbQuoteFilled
              className="text-xl"
              style={{
                color: colorCombos[3].mainColor,
              }}
            />
          </QuickAccessItem>
          <QuickAccessItem
            onClick={() =>
              open({ title: "Add Movie/Series", type: "atom_movie_series" })
            }
            text="Atom: Movie/Series"
            colorConfig={colorCombos[3]}
          >
            <TbMovie
              className="text-xl"
              style={{
                color: colorCombos[3].mainColor,
              }}
            />
          </QuickAccessItem>
          <QuickAccessItem
            onClick={() => open({ title: "Add Link", type: "atom_link" })}
            text="Atom: Link"
            colorConfig={colorCombos[3]}
          >
            <TbLink
              className="text-xl"
              style={{
                color: colorCombos[3].mainColor,
              }}
            />
          </QuickAccessItem>
          <AddIdeaModal>
            <QuickAccessItem text="Float Idea" colorConfig={colorCombos[5]}>
              <IoMdCloudUpload
                className="text-xl"
                style={{
                  color: colorCombos[5].mainColor,
                }}
              />
            </QuickAccessItem>
          </AddIdeaModal>
          <QuickAccessItem text="Add Task" colorConfig={colorCombos[4]}>
            <MdPlaylistAdd
              className="text-2xl"
              style={{
                color: colorCombos[4].mainColor,
              }}
            />
          </QuickAccessItem>
        </div>
      </div>
    </div>
  );
}
