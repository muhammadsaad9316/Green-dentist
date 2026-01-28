import { AxiosError } from "axios";

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    details?: Record<string, any>;
}

export function handleApiError(error: unknown): ApiError {
    if (error instanceof AxiosError) {
        const data = error.response?.data;

        // Try to extract message from common API error formats
        const message =
            data?.message ||
            data?.error?.message ||
            error.message ||
            "An unexpected error occurred.";

        return {
            message,
            code: data?.code || error.code,
            status: error.response?.status,
            details: data?.details
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
            details: { stack: error.stack }
        };
    }

    return {
        message: "An unknown error occurred.",
        details: { raw: error }
    };
}
