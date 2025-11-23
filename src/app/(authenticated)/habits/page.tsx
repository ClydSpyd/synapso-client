"use client";
import PageHeader from "@/components/page-header";
import { colorCombos } from "@/config/color-config";
import React, { useEffect } from "react";
import SelectPill from "@/components/ui/select-pill";
import WeekView from "./views/week-view";
import MonthView from "./views/month-view";
import { useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/use-local-storage";
import { useModalStore } from "@/stores/modal-store";
import useHabitParams from "./hooks/useHabitParams";

type View = "month" | "week";
const compMap: Record<View, React.ReactNode> = {
  month: <MonthView />, 
  week: <WeekView />,
};

export default function HabitsPage() {
  useHabitParams(); // observe URL for new habit payloads
  const queryClient = useQueryClient();
  const { open } = useModalStore();
  const [selectedView, setSelectedView] = useLocalStorage<View>(
    "synapso-view",
    "week"
  );
  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["user-habits"] });
  }, [selectedView]);

  return (
    <div className="h-full w-full max-w-[1250px] mx-auto flex flex-col py-8 px-12 bg-slate-50/50">
      <PageHeader
        title="Habit Tracker"
        subtitle="Keep track of your daily activity"
        rightSideElements={
          <div className="flex gap-2 items-center grow justify-between">
            <div className="flex gap-1 ml-12 bg-white border border-slate-100 shadow-md px-1 py-1 rounded-lg">
              <SelectPill
                css={{
                  borderRadius: "4px",
                  padding: "4px 6px",
                  fontSize: "12px",
                }}
                isSelected={selectedView === "month"}
                onClick={() => setSelectedView("month")}
                label="Month View"
                value="month"
                colorConfig={colorCombos[7]}
              />
              <SelectPill
                css={{
                  borderRadius: "4px",
                  padding: "4px 6px",
                  fontSize: "12px",
                }}
                isSelected={selectedView === "week"}
                onClick={() => setSelectedView("week")}
                label="Week View"
                value="week"
                colorConfig={colorCombos[7]}
              />
            </div>
            <button
              onClick={() => {
                open({ type: "habit" });
              }}
              className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 hover:scale-105 !transition-transform ease-in-out !duration-300 cursor-pointer"
            >
              <h1 className="text-2xl m-0 relative bottom-0.5">+</h1>
              <p className="m-0 text.md font-semibold">New Habit</p>
            </button>
          </div>
        }
      />
      <div>
        {compMap[selectedView] ? (
          compMap[selectedView]
        ) : (
          <div className="text-center text-gray-500">
            Select a view to display habits.
          </div>
        )}
      </div>
    </div>
  );
}
