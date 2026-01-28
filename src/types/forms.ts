/**
 * Booking form data structure
 */
export interface BookingFormData {
    serviceId: string;
    date: Date;
    timeSlot: string;
    name: string;
    email: string;
    phone: string;
    notes?: string;
}
