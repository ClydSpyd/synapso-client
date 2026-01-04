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
  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await baseClient.delete(`/wiki/quotes/delete/${id}/`);
      return {
        status: response.status,
        data: null,
      };
    } catch (error) {
      console.log("Error deleting quote:", error);
      const err = error as AxiosError<{ detail: string }>;
      return {
        status: err.code || 500,
        error: err.response?.data.detail || err.message,
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