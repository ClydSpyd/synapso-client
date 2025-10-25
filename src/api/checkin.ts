import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const checkinMethods = {
  create: async (payload: Checkin, date: string): Promise<ApiResponse<Checkin>> => {
    try {
      const response = await baseClient.post(`/checkin/?date=${date}`, payload);
      return { data: response.data , status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { error: error.message, status: error.code || 500 };
      }
      throw error;
    }
  },
  getCheckin: async (date?: string): Promise<ApiResponse<Checkin[]>> => {
    try {
      const response = await baseClient.get("/checkin/?date=" + date);
      console.log("API.getCheckin response data:", response);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { error: error.message, status: error.code || 500 };
      }
      throw error;
    }
  },
  getCheckinsByMonth: async (month: number, year: number): Promise<ApiResponse<string[]>> => {
    try {
      const response = await baseClient.get(`/checkin/monthly/?month=${month}&year=${year}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { error: error.message, status: error.code || 500 };
      }
      throw error;
    }
  },  
};
