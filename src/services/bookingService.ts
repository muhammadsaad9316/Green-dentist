import type { BookingFormValues } from "@/lib/validation/bookingSchema";
import { getServiceById } from "./serviceService";

/**
 * Create booking summary from form data
 */
export function createBookingSummary(booking: Partial<BookingFormValues>) {
    const service = booking.serviceId ? getServiceById(booking.serviceId) : null;

    return {
        service: service?.name || "Unknown Service",
        date: booking.date?.toLocaleDateString() || "No date selected",
        time: booking.timeSlot || "No time selected",
        patient: booking.name || "Unknown",
        email: booking.email || "",
        phone: booking.phone || "",
        notes: booking.notes || "",
    };
}

import { apiClient } from "@/lib/apiClient";

/**
 * Validate booking availability
 */
export async function checkAvailability(date: Date, timeSlot: string): Promise<boolean> {
    try {
        const response = await apiClient.get<{ available: boolean }>("/bookings/availability", {
            params: {
                date: date.toISOString(),
                timeSlot
            }
        });
        return response.data.available;
    } catch (error) {
        // Fallback to true if API fails for now, or handle specifically
        console.error("Availability check failed:", error);
        return true;
    }
}

/**
 * Submit booking
 */
export async function submitBooking(
    booking: BookingFormValues
): Promise<{ success: boolean; confirmationNumber?: string }> {
    const response = await apiClient.post<{ success: boolean; confirmationNumber: string }>(
        "/bookings",
        booking
    );

    return response.data;
}
