import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGlanceStats = (weekOffset: number) => {
  return useQuery<WeekGlanceStats, Error>({
    queryKey: ["week-glance-stats", weekOffset],
    queryFn: async () => {
      const response = await API.stats.getWeekGlanceStats(weekOffset);
      if (response.error)
        throw new Error(
          response.error
            ? "Error occurred while fetching stats"
            : "Unknown error"
        );
      return response.data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
