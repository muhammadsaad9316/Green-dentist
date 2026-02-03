import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const range = searchParams.get('range') || '7'; // Default 7 days
        const days = parseInt(range);

        const today = new Date();
        const startDate = subDays(today, days);

        // 1. Get stats by status
        const statusStats = await prisma.appointment.groupBy({
            by: ['status'],
            _count: {
                id: true,
            },
        });

        // 2. Get bookings trend (last N days)
        const bookings = await prisma.appointment.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                },
            },
            select: {
                createdAt: true,
            },
        });

        // Process trend data
        const trendMap = new Map<string, number>();
        // Initialize map with 0 for all days to prevent gaps
        for (let i = 0; i <= days; i++) {
            const d = subDays(today, i);
            trendMap.set(format(d, 'yyyy-MM-dd'), 0);
        }

        // Fill with actual data
        bookings.forEach(b => {
            const dateKey = format(b.createdAt, 'yyyy-MM-dd');
            if (trendMap.has(dateKey)) {
                trendMap.set(dateKey, (trendMap.get(dateKey) || 0) + 1);
            }
        });

        // Convert map to array and sort
        const trend = Array.from(trendMap.entries())
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));

        // 3. Get total patients count
        const totalPatients = await prisma.patient.count();

        // 4. Get popular services
        const serviceStats = await prisma.appointment.groupBy({
            by: ['serviceName'],
            _count: {
                serviceId: true,
            },
            orderBy: {
                _count: {
                    serviceId: 'desc',
                },
            },
            take: 5,
        });

        return NextResponse.json({
            statusBreakdown: statusStats.map(s => ({ status: s.status, count: s._count.id })),
            bookingTrends: trend,
            totalPatients,
            popularServices: serviceStats.map(s => ({ serviceName: s.serviceName, count: s._count.serviceId })),
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
