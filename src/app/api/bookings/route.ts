import { NextResponse } from 'next/server';
import { z } from 'zod';
import { upsertPatient, createAppointment } from '@/lib/dummy-store';

const createBookingSchema = z.object({
    serviceId: z.string().min(1, "Service is required"),
    date: z.string(),
    timeSlot: z.string().min(1, "Time slot is required"),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Valid phone number is required"),
    notes: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = createBookingSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.format() },
                { status: 400 }
            );
        }

        const data = validation.data;

        const patient = upsertPatient({
            name: data.name,
            email: data.email,
            phone: data.phone,
        });

        const appointment = createAppointment({
            serviceId: data.serviceId,
            serviceName: data.serviceId, // Use the service ID as the name for demo
            date: new Date(data.date),
            timeSlot: data.timeSlot,
            patientId: patient.id,
            notes: data.notes,
            patient: { name: patient.name, email: patient.email, phone: patient.phone },
        });

        return NextResponse.json({
            success: true,
            confirmationNumber: appointment.confirmationNumber,
            id: appointment.id,
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
