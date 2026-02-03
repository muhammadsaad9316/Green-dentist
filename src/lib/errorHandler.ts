import axios, { type AxiosError } from "axios";

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    details?: unknown;
}

/**
 * Transform API error to user-friendly message
 */
export function handleApiError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;

        return {
            message: axiosError.response?.data?.message || axiosError.message,
            code: axiosError.code,
            status: axiosError.response?.status,
            details: axiosError.response?.data,
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
        };
    }

    return {
        message: "An unexpected error occurred",
    };
}
