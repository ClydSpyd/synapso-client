import axios, { AxiosError } from "axios";
import { title } from "process";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ApiResponse<T = unknown> {
  status: number | string;
  data?: T;
  error?: string;
}

const baseHeaders = {
  common: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const baseClient = axios.create({
  baseURL: baseUrl,
  headers: baseHeaders,
  withCredentials: true,
});

const ombdClient = axios.create({
  baseURL: "https://omdbapi.com",
  headers: {
    ...baseHeaders,
  },
  withCredentials: true,
});

ombdClient.interceptors.request.use((config) => {
  const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  if (omdbApiKey) {
    config.params = {
      ...config.params,
      apiKey: omdbApiKey,
    };
  }
  return config;
});

baseClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      console.error("Unauthorized access - redirecting to logout");
      window.location.href = "/logout";
    }
    return Promise.reject(err);
  }
);

export const API = {
  habbits: {
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
  },
  focus: {
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
  },
  omdb: {
    searchMovie: async (title: string): Promise<ApiResponse<OMDBMovie[]>> => {
      try {
        const response = await baseClient.get(
          "media/omdb/search/?type=movie&s=" + title
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
  },
  movies: {
    add: async (
      payload: OMDBMovie
    ): Promise<ApiResponse<Record<string, unknown>>> => {
      try {

        const movieData = {
          title: payload.Title,
          year: payload.Year,
          imdb_id: payload.imdbID,
          poster: payload.Poster,
        };

        const response = await baseClient.post("media/movies/add/", movieData);
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
  },
};
