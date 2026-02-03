import type { BookingFormValues } from "@/lib/validation/bookingSchema";
import { getServiceById } from "./serviceService";
import { logger } from "@/lib/logger";

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
        const response = await apiClient.get<{ bookedSlots: string[] }>("/bookings/availability", {
            params: {
                date: date.toISOString(),
            }
        });

        // If the slot is found in bookedSlots, it is NOT available
        // Return true if NOT found
        return !response.data.bookedSlots.includes(timeSlot);
    } catch (error) {
        logger.error("Availability check failed:", error);
        // Fail open or closed? Closed (return false) is safer.
        return false;
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
