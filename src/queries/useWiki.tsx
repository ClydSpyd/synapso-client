import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useWikiItems = () => {
  return useQuery<WikiItem[], Error>({
    queryKey: ["wiki-items"],
    queryFn: async () => {
      const { error, data } = await API.wiki.getAllItems();
      if (error)
        throw new Error(
          error
            ? "Error occurred while fetching wiki items"
            : "Unknown error"
        );
      return data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
