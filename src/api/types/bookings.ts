import type { BookingFormValues } from "@/lib/validation/bookingSchema";

/**
 * API request/response types for bookings
 */

export interface CreateBookingRequest {
    serviceId: string;
    date: string; // ISO date string
    timeSlot: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    notes?: string;
}

export interface BookingResponse {
    id: string;
    confirmationNumber: string;
    serviceId: string;
    serviceName: string;
    date: string;
    timeSlot: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    notes?: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

export interface GetBookingsResponse {
    bookings: BookingResponse[];
    total: number;
}

/**
 * Transform form data to API request
 */
export function toBookingRequest(formData: BookingFormValues): CreateBookingRequest {
    return {
        serviceId: formData.serviceId,
        date: formData.date.toISOString(),
        timeSlot: formData.timeSlot,
        patientName: formData.name,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        notes: formData.notes,
    };
}
