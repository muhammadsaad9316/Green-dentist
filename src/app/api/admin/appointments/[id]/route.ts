import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { rateLimit } from '@/lib/rateLimit';
import { logAdminAction } from '@/lib/audit';
import { sanitize } from '@/lib/sanitize';
import { appointmentUpdateSchema } from '@/lib/validation/admin';
import { headers } from 'next/headers';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const appointment = await prisma.appointment.findUnique({
            where: { id },
            include: {
                patient: true,
            },
        });

        if (!appointment) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        return NextResponse.json(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        return NextResponse.json(
            { error: 'Failed to fetch appointment' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate Limit Check
    const ip = (await headers()).get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(ip, 50, 60 * 1000); // 50 writes per minute
    if (!success) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    try {
        const { id } = await params;
        const body = await request.json();

        // Validation
        const result = appointmentUpdateSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: 'Validation failed', details: result.error.flatten() }, { status: 400 });
        }

        const data = result.data;

        // Sanitize Notes if present
        if (data.notes) {
            data.notes = sanitize(data.notes);
        }

        const appointment = await prisma.appointment.update({
            where: { id },
            data: {
                ...(data.date && { date: new Date(data.date) }),
                ...(data.timeSlot && { timeSlot: data.timeSlot }),
                ...(data.notes && { notes: data.notes }),
                ...(data.serviceId && { serviceId: data.serviceId }),
            },
        });

        // Audit Log
        await logAdminAction(
            session.user.id || 'unknown',
            session.user.name || 'unknown',
            'UPDATE_APPOINTMENT',
            { appointmentId: id, updates: data }
        );

        return NextResponse.json(appointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        return NextResponse.json(
            { error: 'Failed to update appointment' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;

        await prisma.appointment.delete({
            where: { id },
        });

        // Audit Log
        await logAdminAction(
            session.user.id || 'unknown',
            session.user.name || 'unknown',
            'DELETE_APPOINTMENT',
            { appointmentId: id }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        return NextResponse.json(
            { error: 'Failed to delete appointment' },
            { status: 500 }
        );
    }
}
