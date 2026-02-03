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
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const skip = (page - 1) * limit;

        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [patients, total] = await Promise.all([
            prisma.patient.findMany({
                where,
                take: limit,
                skip,
                include: {
                    _count: {
                        select: { appointments: true },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.patient.count({ where }),
        ]);

        return NextResponse.json({
            patients,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.json(
            { error: 'Failed to fetch patients' },
            { status: 500 }
        );
    }
}
