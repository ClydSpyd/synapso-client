import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const omdbMethods = {
  searchMovie: async (
    title: string,
    type: MediaType
  ): Promise<ApiResponse<OMDBMovie[]>> => {
    try {
      const response = await baseClient.get(
        "wiki/omdb/search/?type=" + type + "&plot=full&s=" + title
      );

      if (response.data.Search.length === 0) {
        throw new Error("No movies found for the given title.");
      }

      return {
        status: response.status,
        data: response.data?.Search?.filter(
          (movie: OMDBMovie) => movie.Poster !== "N/A"
        ) as OMDBMovie[],
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
