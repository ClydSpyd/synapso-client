import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const taskMethods = {
  getAll: async (): Promise<ApiResponse<Task[]>> => {
    try {
      const response = await baseClient.get("tasks/list/");
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
  create: async (payload: TaskPayload): Promise<ApiResponse<Task>> => {
    try {
      const response = await baseClient.post("tasks/add/", payload);
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
    payload: Partial<TaskPayload>
  ): Promise<ApiResponse<Task>> => {
    try {
      const response = await baseClient.patch(`tasks/update/${id}/`, payload);
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
  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await baseClient.delete(`tasks/${id}/delete/`);
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