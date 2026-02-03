import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

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

        const patient = await prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: {
                    orderBy: {
                        date: 'desc',
                    },
                },
            },
        });

        if (!patient) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
        }

        return NextResponse.json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        return NextResponse.json(
            { error: 'Failed to fetch patient' },
            { status: 500 }
        );
    }
}
