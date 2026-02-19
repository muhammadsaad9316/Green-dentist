import { NextResponse } from 'next/server';
import { computeAnalytics } from '@/lib/dummy-store';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const days = parseInt(searchParams.get('range') || '7');

        const data = computeAnalytics(days);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
