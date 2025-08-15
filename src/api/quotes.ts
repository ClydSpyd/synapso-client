import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const quoteMethods = {
  add: async (
    payload: WikiQuote
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      const response = await baseClient.post("/wiki/quotes/add/", payload);
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
      const response = await baseClient.get("/wikiquotes/");
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