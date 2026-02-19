import { NextResponse } from 'next/server';
import { getAllAppointments } from '@/lib/dummy-store';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search')?.toLowerCase();
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let appointments = getAllAppointments();

        if (status && status !== 'ALL') {
            appointments = appointments.filter(a => a.status === status);
        }

        if (search) {
            appointments = appointments.filter(a =>
                a.patient.name.toLowerCase().includes(search) ||
                a.patient.email.toLowerCase().includes(search) ||
                a.confirmationNumber.toLowerCase().includes(search)
            );
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            appointments = appointments.filter(a => a.date >= start && a.date <= end);
        }

        const sorted = [...appointments].sort((a, b) => b.date.getTime() - a.date.getTime());

        return NextResponse.json(sorted);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
    }
}
