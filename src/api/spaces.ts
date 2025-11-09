import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const spacesMethods = {
  getAllSummaries: async (): Promise<ApiResponse<SpaceSummary[]>> => {
    try {
      const response = await baseClient.get("spaces/");
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError;
      return {
        status: err.code || 500,
        error: err.message,
      };
    }
  },
};
