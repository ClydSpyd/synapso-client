import { API } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useHabits({
  withActivity,
  dateRange,
  startDate,
}: {
  withActivity: true;
  dateRange?: number;
  startDate?: string;
}): UseQueryResult<HabitActivity[], Error>;

export function useHabits({
  withActivity,
  dateRange,
  startDate,
}: {
  withActivity: false;
  dateRange?: number;
  startDate?: string;
}): UseQueryResult<Habit[], Error>;

export function useHabits({
  withActivity,
  dateRange,
  startDate,
}: {
  withActivity: boolean;
  dateRange?: number;
  startDate?: string;
}) {
  return useQuery<Habit[] | HabitActivity[], Error>({
    queryKey: ["user-habits", { withActivity, startDate, dateRange }],
    queryFn: async () => {
      const { error, data } = await API.habits.getAll({
        withActivity: !!withActivity,
        startDate,
        dateRange,
      });
      if (error)
        throw new Error(
          error ? "Error occurred while fetching habits" : "Unknown error"
        );
      return data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
