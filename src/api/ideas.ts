import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const ideaMethods = {
  getAll: async (): Promise<ApiResponse<Idea[]>> => {
    try {
      const response = await baseClient.get("ideas/");
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
  create: async (payload: { title: string; tags: string[] }): Promise<ApiResponse<Idea>> => {
    try {
      const response = await baseClient.post("ideas/", payload);
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
  delete: async (ideaId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await baseClient.delete(`ideas/${ideaId}/delete/`);
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