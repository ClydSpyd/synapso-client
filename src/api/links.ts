import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const linkMethods = {
  add: async (
    payload: WikiLink
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      const response = await baseClient.post("/wiki/links/add/", payload);
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
  getAll: async (): Promise<ApiResponse<WikiQuote[]>> => {
    try {
      const response = await baseClient.get("/wiki/links/");
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
