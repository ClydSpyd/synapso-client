import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const habitMethods = {
  getAll: async ({
    withActivity,
    startDate, // 'YYYY-MM-DD'
    dateRange,
  }: {
    withActivity: boolean;
    startDate?: string;
    dateRange?: number;
  }): Promise<ApiResponse<Habit[]>> => {
    try {
      const slug = withActivity ? "habits/activity/" : "habits/list/";
      const response = await baseClient.get(slug, {
        params: {
          with_activity: withActivity,
          start_date: startDate,
          range_days: dateRange,
        },
      });
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
  update: async (payload: HabitPayload): Promise<ApiResponse<Habit>> => {
    try {
      const response = await baseClient.patch(`habits/${payload.id}/`, payload);
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
  toggleActivity: async (
    habitId: string,
    date: string // 'YYYY-MM-DD'
  ): Promise<ApiResponse<Record<string, string>>> => {
    try {
      const response = await baseClient.post(`habits/toggle/`, {
        date,
        habit_id: habitId,
      });
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
  getStats: async (): Promise<ApiResponse<Record<string, number>>> => {
    try {
      const response = await baseClient.get("habits/stats/");
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
