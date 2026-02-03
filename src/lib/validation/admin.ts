import { z } from "zod";

// Enum mirroring Prisma (can be imported if generated client handles enums well in frontend code, but safer to redefine for Zod)
const AppointmentStatus = z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]);

export const appointmentStatusSchema = z.object({
    status: AppointmentStatus
});

export const appointmentUpdateSchema = z.object({
    date: z.string().datetime().optional(),
    timeSlot: z.string().optional(),
    serviceId: z.string().optional(),
    notes: z.string().max(1000, "Notes too long").optional(),
});

export const patientUpdateSchema = z.object({
    name: z.string().min(2, "Name too short").max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(8).max(20).optional(),
});
