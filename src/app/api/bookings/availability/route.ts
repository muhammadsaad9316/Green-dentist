import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const availabilitySchema = z.object({
    date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)), // Accept ISO or YYYY-MM-DD
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date');

        if (!dateParam) {
            return NextResponse.json({ error: 'Date is required' }, { status: 400 });
        }

        // Simple validation, allow the date to be passed in
        const date = new Date(dateParam);
        if (isNaN(date.getTime())) {
             return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
        }

        // Set time range for the entire day (00:00:00 to 23:59:59) in UTC or local? 
        // Best to use the Start/End of the provided day.
        // Assuming the date comes in as a specific day, we want to match any appointment on that "day".
        
        // Use setHours to safe-guard typical "date only" comparisons
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Fetch appointments for this date range
        // Status should NOT be CANCELLED or REJECTED (?) - Assuming 'PENDING' and 'CONFIRMED' block slots.
        const bookings = await prisma.appointment.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: {
                    in: ['PENDING', 'CONFIRMED', 'COMPLETED']
                }
            },
            select: {
                timeSlot: true
            }
        });

        const bookedSlots = bookings.map(b => b.timeSlot);

        return NextResponse.json({ bookedSlots });

    } catch (error) {
        console.error('Error fetching availability:', error);
        return NextResponse.json(
            { error: 'Failed to check availability' },
            { status: 500 }
        );
    }
}
