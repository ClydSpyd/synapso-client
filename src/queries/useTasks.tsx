import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { error, data } = await API.tasks.getAll();
      if (error)
        throw new Error(
          error ? "Error occurred while fetching tasks" : "Unknown error"
        );
      return data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
