import { NextResponse } from 'next/server';
import { getAllPatients } from '@/lib/dummy-store';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search')?.toLowerCase();
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        let patients = getAllPatients();

        if (search) {
            patients = patients.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.email.toLowerCase().includes(search) ||
                p.phone.includes(search)
            );
        }

        const total = patients.length;
        const skip = (page - 1) * limit;
        const paginated = patients.slice(skip, skip + limit);

        return NextResponse.json({
            patients: paginated,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
    }
}
