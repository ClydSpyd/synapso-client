import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useActivitySnapshot = (date: string) => {
  return useQuery<ActivityEntry[], Error>({
    queryKey: ["activity-snapshot", date],
    queryFn: async () => {
      const response = await API.activitySnapshot.getActivitiesByDate(date);
      if (response.error)
        throw new Error(
          response.error
            ? "Error occurred while fetching activity snapshot"
            : "Unknown error"
        );
      return response.data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
