import { API } from "@/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function usePinnedItems(
  enriched: true
): UseQueryResult<WikiPin[], Error>;
export function usePinnedItems(
  enriched?: false
): UseQueryResult<PinPayload[], Error>;
export function usePinnedItems(enriched?: boolean) {
  return useQuery({
    queryKey: ["pinned-items", enriched ? "enriched" : "basic"] as const,
    queryFn: async () => {
      const response = await API.pinned.getAll({ enriched: !!enriched });
      if (response.error) {
        throw new Error("Error occurred while fetching settings");
      }
      // runtime returns correct shape; types flow from the overload used
      return response.data!;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
