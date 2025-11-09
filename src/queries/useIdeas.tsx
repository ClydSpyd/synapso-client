import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useIdeas = () => {
  return useQuery<Idea[], Error>({
    queryKey: ["ideas"],
    queryFn: async () => {
      const { error, data } = await API.ideas.getAll();
      if (error)
        throw new Error(
          error ? "Error occurred while fetching check-in" : "Unknown error"
        );
      return data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
