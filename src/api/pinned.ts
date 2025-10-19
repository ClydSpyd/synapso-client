import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const pinnedMethods = {
  add: async (
    payload: Partial<PinPayload>
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      const response = await baseClient.post(
        "/wiki/pinned-items/add/",
        payload
      );
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
  delete: async (
    id:string,  
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      const response = await baseClient.delete(
        "/wiki/pinned-items/delete/" + id + "/"
      );
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
  getAll: async ({
    enriched,
  }: {
    enriched: boolean;
  }): Promise<ApiResponse<PinPayload[] | WikiPin[]>> => {
    try {
      const response = await baseClient.get(
        `/wiki/pinned-items/${enriched ? "enriched/" : ""}`
      );
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