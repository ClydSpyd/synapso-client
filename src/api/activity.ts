import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const activityMethods = {
  getActivitiesByDate: async (date: string): Promise<ApiResponse<ActivityEntry[]>> => {
    try {
      const response = await baseClient.get(`activity/?date=${date}`);
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
  create: async (entry:ActivityEntry): Promise<ApiResponse<ActivityEntry>> => {
    try {
      const response = await baseClient.post("activity/", entry);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError<Record<string, unknown>>;
      console.log("Error response data:", err.response?.data);
      const errorMessage = Object.entries(err.response?.data || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
        console.log("Constructed error message:", errorMessage);
      return {
        status: err.code || 500,
        error: errorMessage || err.message,
      };
    }
  },
  edit: async (id: number, entry: Partial<Omit<ActivityEntry, "id">>): Promise<ApiResponse<ActivityEntry>> => {
    try {
      const response = await baseClient.patch(`activity/${id}/`, entry);
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
  delete: async (id: number): Promise<ApiResponse<null>> => {
    try {
      const response = await baseClient.delete(`activity/${id}/`);
      return {
        status: response.status,
        data: null,
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