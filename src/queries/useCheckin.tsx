import { API } from "@/api";
import { CheckinValues } from "@/app/(authenticated)/home/components/check-in/checkin-history-modal/module-content";
import { useQuery } from "@tanstack/react-query";

export const useCheckin = (date: string) => {
  return useQuery<CheckinValues, Error>({
    queryKey: ["checkins", date],
    queryFn: async () => {
      console.log("Fetching check-in:", date);
      const response = await API.checkin.getCheckin(date);
      if (response.error)
        throw new Error(
          response.error
            ? "Error occurred while fetching check-in"
            : "Unknown error"
        );
      const returnPayload: CheckinValues = {
        mood: response.data![0]?.mood || 0,
        energy_level: response.data![0]?.energy_level || 0,
        focus_level: response.data![0]?.focus_level || 0,
        stress_level: response.data![0]?.stress_level || 0,
        reflection: response.data![0]?.reflection || "",
      };
      console.log("Fetched check-in data:", returnPayload);
      return returnPayload;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
