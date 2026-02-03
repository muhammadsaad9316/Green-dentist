import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Build where clause
        const where: any = {};

        if (status && status !== 'ALL') {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { patient: { name: { contains: search, mode: 'insensitive' } } },
                { patient: { email: { contains: search, mode: 'insensitive' } } },
                { confirmationNumber: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                patient: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
            },
            orderBy: {
                date: 'desc',
            },
        });

        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch appointments' },
            { status: 500 }
        );
    }
}
