import axios, { AxiosError } from "axios";
import { habitMethods } from "./habits";
import { focusMethods } from "./focus";
import { omdbMethods } from "./omdb";
import { mediaMethods } from "./media";
import { quoteMethods } from "./quotes";
import { bookMethods } from "./books";
import { linkMethods } from "./links";
import { pinnedMethods } from "./pinned";
import { checkinMethods } from "./checkin";
import { statsMethods } from "./stats";
import { ideaMethods } from "./ideas";
import { taskMethods } from "./tasks";
import { spacesMethods } from "./spaces";

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

export const baseClient = axios.create({
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
  (response) => response,
  async (error) => {
    const err = error as AxiosError;

    // If no response or no status, just reject
    if (!err.response) return Promise.reject(err);

    const originalRequest = err.config;
    console.log("API error intercepted:", originalRequest?.url);

    // avoid infinite loop:
    // if the call was /refresh, logout immediately
    if (originalRequest?.url?.includes("/refresh/")) {
      console.warn("Refresh token failed -> logging out");
      window.location.href = "/logout";
      return Promise.reject(err);
    }

    if (err.response.status === 401) {
      try {
        console.log("401 detected - attempting token refresh");
        await baseClient.post("/auth/token/refresh/");
        if (originalRequest) {
          return baseClient.request(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh failed -> logout");
        window.location.href = "/logout";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);


export const API = {
  habits: habitMethods,
  focus: focusMethods,
  omdb: omdbMethods,
  wiki: {
    getAllItems: async (): Promise<ApiResponse<WikiItem[]>> => {
      try {
        const response = await baseClient.get("/wiki/");
        console.log("Wiki items response:", response);
        return { data: response.data, status: response.status };
      } catch (error) {
        console.error("Error fetching wiki items:", error);
        return {
          status: (error as AxiosError).code || 500,
          error: (error as AxiosError).message || "Unknown error",
        };
      }
    },
  },
  media: mediaMethods,
  quotes: quoteMethods,
  links: linkMethods,
  books: bookMethods,
  pinned: pinnedMethods,
  checkin: checkinMethods,
  stats: statsMethods,
  ideas: ideaMethods,
  tasks: taskMethods,
  spaces: spacesMethods,
};
