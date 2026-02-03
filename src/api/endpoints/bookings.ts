import { apiClient } from "@/lib/apiClient";
import type {
    CreateBookingRequest,
    BookingResponse,
    GetBookingsResponse,
} from "../types/bookings";

/**
 * Booking API endpoints
 */

export const bookingsApi = {
    /**
     * Create a new booking
     */
    async create(data: CreateBookingRequest): Promise<BookingResponse> {
        const response = await apiClient.post<BookingResponse>("/bookings", data);
        return response.data;
    },

    /**
     * Get booking by ID
     */
    async getById(id: string): Promise<BookingResponse> {
        const response = await apiClient.get<BookingResponse>(`/bookings/${id}`);
        return response.data;
    },

    /**
     * Get all bookings (with optional filters)
     */
    async getAll(params?: {
        page?: number;
        limit?: number;
        status?: string;
    }): Promise<GetBookingsResponse> {
        const response = await apiClient.get<GetBookingsResponse>("/bookings", { params });
        return response.data;
    },

    /**
     * Cancel a booking
     */
    async cancel(id: string): Promise<BookingResponse> {
        const response = await apiClient.patch<BookingResponse>(`/bookings/${id}/cancel`);
        return response.data;
    },

    /**
     * Check availability for a date/time
     */
    async checkAvailability(date: string, timeSlot: string): Promise<{ available: boolean }> {
        const response = await apiClient.get<{ available: boolean }>("/bookings/availability", {
            params: { date, timeSlot },
        });
        return response.data;
    },
};
