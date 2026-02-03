import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(appointment);
    } catch (error) {
        console.error('Error updating status:', error);
        return NextResponse.json(
            { error: 'Failed to update status' },
            { status: 500 }
        );
    }
}
