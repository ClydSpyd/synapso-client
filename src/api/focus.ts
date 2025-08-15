import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const focusMethods = {
  getAll: async (): Promise<ApiResponse<FocusItem[]>> => {
    try {
      const response = await baseClient.get("focus/");
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
  create: async (payload: FocusPayload): Promise<ApiResponse<FocusItem>> => {
    try {
      const response = await baseClient.post("focus/", payload);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError<{ non_field_errors: string[] }>;
      console.log({ err });
      return {
        status: err.code || 500,
        error: err.response?.data?.non_field_errors?.[0] || err.message,
      };
    }
  },
  update: async (
    id: string,
    payload: Partial<FocusPayload>
  ): Promise<ApiResponse<FocusItem>> => {
    try {
      const response = await baseClient.patch(`focus/${id}/`, payload);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError<{ non_field_errors: string[] }>;
      console.log({ err });
      return {
        status: err.code || 500,
        error: err.response?.data?.non_field_errors?.[0] || err.message,
      };
    }
  },
};
