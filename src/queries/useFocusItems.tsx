import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useFocusItems = () => {
  return useQuery<FocusItem[], Error>({
    queryKey: ["focus-items"],
    queryFn: async () => {
      const response = await API.focus.getAll();
      if (response.error)
        throw new Error(
          response.error
            ? "Error occurred while fetching settings"
            : "Unknown error"
        );
      return response.data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
