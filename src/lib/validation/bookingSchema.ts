import * as z from "zod";

/**
 * Complete booking form schema
 */
export const bookingFormSchema = z.object({
    serviceId: z.string().min(1, "Please select a service"),
    date: z.date(),
    timeSlot: z.string().min(1, "Please select a time"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number is too long"),
    notes: z.string().optional(),
});

/**
 * Individual step schemas for progressive validation
 */
export const stepSchemas = {
    service: z.object({
        serviceId: z.string().min(1, "Please select a service"),
    }),
    dateTime: z.object({
        date: z.date(),
        timeSlot: z.string().min(1, "Please select a time"),
    }),
    details: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string()
            .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number is too long"),
        notes: z.string().optional(),
    }),
};

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
