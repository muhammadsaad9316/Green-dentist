import { NextResponse } from 'next/server';
import { findAppointmentById, updateAppointment } from '@/lib/dummy-store';
import type { AppointmentStatus } from '@/lib/dummy-store';

const VALID_STATUSES: AppointmentStatus[] = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!VALID_STATUSES.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const existing = findAppointmentById(id);
        if (!existing) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        const updated = updateAppointment(id, { status });
        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating status:', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}
