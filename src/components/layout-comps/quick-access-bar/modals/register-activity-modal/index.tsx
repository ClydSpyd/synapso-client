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
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";

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
  console.log({ Ö: habits });

  function patchHabitRecords(
    habits: HabitActivity[],
    habitId: string,
    date: string
  ) {
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
      queryClient.invalidateQueries({
        queryKey: ["user-habits"],
        exact: false,
      });
      setSubmitError(error);
    } else {
      queryClient.invalidateQueries({
        queryKey: ["user-habits"],
        exact: false,
      });
    }
  };

  return (
    <>
      <Modal
        {...modalConfig}
        opened={opened}
        onClose={() => {
          close();
        }}
      >
        <ModalContentWrapper
          title="Today's activity"
          subtitle={formatTodayString()}
          close={close}
        >
          <>
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
                colorConfig={colorCombos[habit.colorScheme]}
              />
            ))}
            {submitError && (
              <p className="text-xs mx-auto text-center mt-2 text-red-500">
                {submitError}
              </p>
            )}
          </>
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
