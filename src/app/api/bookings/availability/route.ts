import { NextResponse } from 'next/server';
import { getAllAppointments } from '@/lib/dummy-store';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date');

        if (!dateParam) {
            return NextResponse.json({ error: 'Date is required' }, { status: 400 });
        }

        const date = new Date(dateParam);
        if (isNaN(date.getTime())) {
            return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const bookedSlots = getAllAppointments()
            .filter(a =>
                a.date >= startOfDay &&
                a.date <= endOfDay &&
                ['PENDING', 'CONFIRMED', 'COMPLETED'].includes(a.status)
            )
            .map(a => a.timeSlot);

        return NextResponse.json({ bookedSlots });

    } catch (error) {
        console.error('Error fetching availability:', error);
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }
}
