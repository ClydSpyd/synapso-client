import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const bookMethods = {
  searchBook: async (query: string): Promise<ApiResponse<OpenLibBook[]>> => {
    try {
      const response = await baseClient.get("wiki/books/search/", {
        params: { q: query },
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
  add: async (
    bookData: OpenLibBook
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    try {
      const response = await baseClient.post("wiki/books/", {
        ...bookData,
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
  delete: async (olid: string): Promise<ApiResponse<null>> => {
    try {
      const response = await baseClient.delete(`wiki/books/`, {
        data: { olid },
      });
      return {
        status: response.status,
        data: null,
      };
    } catch (error) {
      console.log("Error deleting book:", error);
      const err = error as AxiosError<{ detail: string }>;
      return {
        status: err.code || 500,
        error: err.response?.data.detail || err.message,
      };
    }
  },
};
