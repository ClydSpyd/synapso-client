import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSpaceSummaries = () => {
  return useQuery<SpaceSummary[], Error>({
    queryKey: ["spaces"],
    queryFn: async () => {
      const { error, data } = await API.spaces.getAllSummaries();
      if (error)
        throw new Error(
          error ? "Error occurred while fetching spaces" : "Unknown error"
        );
      return data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
