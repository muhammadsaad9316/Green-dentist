import { NextResponse } from 'next/server';
import { findAppointmentById, updateAppointment, deleteAppointment } from '@/lib/dummy-store';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const appointment = findAppointmentById(id);

        if (!appointment) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        return NextResponse.json(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = updateAppointment(id, {
            ...(body.date && { date: new Date(body.date) }),
            ...(body.timeSlot && { timeSlot: body.timeSlot }),
            ...(body.notes !== undefined && { notes: body.notes }),
            ...(body.serviceId && { serviceId: body.serviceId }),
        });

        if (!updated) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating appointment:', error);
        return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = deleteAppointment(id);

        if (!deleted) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
    }
}
