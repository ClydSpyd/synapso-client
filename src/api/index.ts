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
  (response) => {
    return response;
  },
  async (error) => {
    const err = error as AxiosError;
    // const hasRefreshToken = document.cookie
    //   .split(";")
    //   .some((c) => c.trim().startsWith("refresh_token="));

    //   console.log("Response error intercepted:", { err, hasRefreshToken, cookie: document.cookie });
    if (err.response?.status === 401 ) {
      console.log("Unauthorized access - attempting token refresh");
      try {
        const tokenRes = await baseClient.post("/auth/token/refresh/");
        console.log("Token refreshed successfully", tokenRes.data);
        // retry the original request
        if (err.config) {
          console.log("Retrying original request");
          return baseClient.request(err.config);
        }
        return Promise.reject(err);
      } catch (refreshError) {
        console.error("Token refresh failed - redirecting to logout");
        console.error(refreshError);
        window.location.href = "/logout";
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
};
