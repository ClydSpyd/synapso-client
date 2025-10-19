import { AxiosError } from "axios";
import { ApiResponse, baseClient } from ".";

export const statsMethods = {
    getHabitProgress: async (): Promise<ApiResponse<Record<string, unknown>>> => {
        try {
            const response = await baseClient.get("stats/habit-completion/");
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
    getMentalCheckinStats: async (): Promise<ApiResponse<Record<string, unknown>>> => {
        try {
            const response = await baseClient.get("stats/mental-checkin/");
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