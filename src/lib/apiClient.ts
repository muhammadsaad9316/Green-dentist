import axios, { type AxiosInstance, type AxiosError } from "axios";

/**
 * Base API client configuration
 */
export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Request interceptor (for auth tokens, etc.)
 */
import { getCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";

/**
 * Request interceptor (for auth tokens, etc.)
 */
apiClient.interceptors.request.use(
    async (config) => {
        // Add auth token if available
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add CSRF token
        const csrfToken = await getCsrfToken();
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);



/**
 * Response interceptor (for error handling)
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        const url = error.config?.url;

        // Log error for debugging
        logger.error(`API Error [${status}] at ${url}:`, error);

        // Handle common errors
        if (status === 401) {
            // Unauthorized - could redirect to login
            logger.warn("Unauthorized access - redirecting to login");
            if (typeof window !== "undefined") {
                // window.location.href = "/login"; // Uncomment if auth is implemented
            }
        } else if (status === 403) {
            logger.warn("Forbidden access");
        } else if (status === 404) {
            logger.warn(`Resource not found: ${url}`);
        } else if (status && status >= 500) {
            logger.error("Server error occurred");
        }

        return Promise.reject(error);
    }
);
