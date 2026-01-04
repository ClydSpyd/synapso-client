import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const mediaMethods = {
  add: async (
    imdbId: string,
    mediaType: MediaType
  ): Promise<ApiResponse<WikiItem>> => {
    try {
      console.log("Adding media with IMDB ID:", imdbId, "and type:", mediaType);
      const response = await baseClient.post("wiki/media/", {
        imdb_id: imdbId,
        type: mediaType,
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
  delete: async (id: string, mediaType: MediaType): Promise<ApiResponse<null>> => {
    try {
      const response = await baseClient.delete(`wiki/media/`, {
        data: { imdb_id: id, type: mediaType },
      });
      return {
        status: response.status,
        data: null,
      };
    } catch (error) {
      console.log("Error deleting media:", error);
      const err = error as AxiosError<{detail: string}>;
      return {
        status: err.code || 500,
        error: err.response?.data.detail || err.message,
      };
    }
  },
};
