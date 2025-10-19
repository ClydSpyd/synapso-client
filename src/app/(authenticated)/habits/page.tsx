"use client";
import { useHabits } from "@/queries/useHabits";
import PageHeader from "@/components/page-header";
import { colorCombos } from "@/config/color-config";
import React, { useEffect, useState } from "react";
import SelectPill from "@/components/ui/select-pill";
import WeekView from "./views/week-view";
import MonthView from "./views/month-view";
import { useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/use-local-state";
import AddHabitModal from "@/components/layout-comps/quick-access-bar/modals/add-habit-modal";

type View = "month" | "week";
const compMap: Record<View, React.ReactNode> = {
  month: <MonthView />, // Placeholder for Month View component
  week: <WeekView />,
};

export default function HabitsPage() {
  const queryClient = useQueryClient();
  // const { data, error, isLoading } = useHabits({
  //   withActivity: true,
  //   dateRange: 7,
  // });
  const [selectedView, setSelectedView] = useLocalStorage<View>("synapso-view", "week");
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
            <AddHabitModal>
              <button className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 hover:scale-105 !transition-transform ease-in-out !duration-300 cursor-pointer">
                <h1 className="text-2xl m-0 relative bottom-0.5">+</h1>
                <p className="m-0 text.md font-semibold">New Habit</p>
              </button>
            </AddHabitModal>
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
