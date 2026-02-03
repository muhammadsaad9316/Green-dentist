import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateConfirmationNumber } from '@/lib/auth';
import type { CreateBookingRequest } from '@/api/types/bookings';
import { z } from 'zod';

// Validation schema for creating a booking
const createBookingSchema = z.object({
    serviceId: z.string().min(1, "Service is required"),
    date: z.string().datetime(),
    timeSlot: z.string().min(1, "Time slot is required"),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Valid phone number is required"),
    notes: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate request body
        const validation = createBookingSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.format() },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Get service details (mock lookup for now, ideally fetch from DB/Config)
        // In a real app, you might validate serviceId against a list of valid services
        const serviceName = data.serviceId // You might want a helper to map ID to Name

        // Check for existing patient or create new one
        const patient = await prisma.patient.upsert({
            where: { email: data.email },
            update: {
                name: data.name,
                phone: data.phone,
            },
            create: {
                name: data.name,
                email: data.email,
                phone: data.phone,
            },
        });

        // Generate unique confirmation number
        const confirmationNumber = generateConfirmationNumber();

        // Create appointment
        const appointment = await prisma.appointment.create({
            data: {
                confirmationNumber,
                serviceId: data.serviceId,
                serviceName: "Dental Service", // TODO: Map ID to actual name
                date: new Date(data.date),
                timeSlot: data.timeSlot,
                patientId: patient.id,
                notes: data.notes,
                status: 'PENDING',
            },
        });

        return NextResponse.json({
            success: true,
            confirmationNumber: appointment.confirmationNumber,
            id: appointment.id
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        );
    }
}
