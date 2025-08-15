import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const habitMethods = {
  getAll: async (): Promise<ApiResponse<Habit[]>> => {
    try {
      const response = await baseClient.get("habits/list/");
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
  create: async (payload: HabitPayload): Promise<ApiResponse<Habit>> => {
    try {
      const response = await baseClient.post("habits/add/", payload);
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
