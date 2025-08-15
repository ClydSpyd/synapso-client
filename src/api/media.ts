import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const mediaMethods = {
  add: async (
    imdbId: string,
    mediaType: MediaType
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      console.log("Adding media with IMDB ID:", imdbId, "and type:", mediaType);
      const response = await baseClient.post("wiki/media/add/", {
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
};
