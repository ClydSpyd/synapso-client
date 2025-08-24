"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useHabits } from "@/queries/useHabits";
import HabitItem from "./habit-item";
import { colorCombos } from "@/config/color-config";
import { formatDatePayload, formatTodayString } from "@/lib/dates";
import { RxCross2 } from "react-icons/rx";
import { strToNumVal } from "@/lib/utils";

export default function RegisterActivityModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: habits } = useHabits({
    withActivity: true,
    startDate: "2025-08-24",
    dateRange: 1,
  });
  console.log({Ö:habits})

  function patchHabitRecords(habits: HabitActivity[], habitId: string, date: string) {
    return habits.map((h) =>
      h.id === habitId
        ? {
            ...h,
            records: h.records?.includes(date)
              ? h.records.filter((d) => d !== date)
              : [...[h.records ?? []], date],
          }
        : h
    );
  }
const handleToggle = async (habitId: string) => {
  const date = formatDatePayload(0);

  // optimistic update
  queryClient.setQueriesData<unknown>(
    { queryKey: ["user-habits"], exact: false },
    (old: HabitActivity[]) =>
      old ? patchHabitRecords(old, habitId, date) : old
  );

  const { error } = await API.habits.toggleActivity(habitId, date);

  if (error) {
    // rollback if needed
    queryClient.invalidateQueries({ queryKey: ["user-habits"], exact: false });
    setSubmitError(error);
  } else {
    queryClient.invalidateQueries({ queryKey: ["user-habits"], exact: false });
  }
};

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setSubmitError(null);
          }, 500);
        }}
        withCloseButton={false}
        // title="Add Quote"
        centered
        transitionProps={{
          transition: "scale-y",
          duration: 200,
          timingFunction: "ease",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          content: {
            padding: 0,
            borderRadius: "8px",
          },
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      >
        <div className="w-full bg-zen-shift rounded-none p-6 relative">
          <div className="absolute top-4 right-4">
            <RxCross2
              className="text-white cursor-pointer"
              size={24}
              onClick={() => {
                close();
                setTimeout(() => {
                  setSubmitError(null);
                }, 500);
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Today&apos;s activity
          </h1>
          <p className="text-gray-200">{formatTodayString()}</p>
        </div>
        <div className="w-full flex flex-col gap-2 p-4">
          {habits?.map((habit) => (
            <HabitItem
              defaultChecked={
                !!habit.records.find(
                  (record) => record === formatDatePayload(0)
                )
              }
              key={habit.id}
              habitData={habit}
              handleToggle={handleToggle}
              colorConfig={
                colorCombos[strToNumVal(habit.title) % colorCombos.length]
              }
            />
          ))}
        </div>
        {submitError && (
          <p className="text-xs mx-auto text-center mt-2 text-red-500">
            {submitError}
          </p>
        )}
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
