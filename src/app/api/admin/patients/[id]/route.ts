import { NextResponse } from 'next/server';
import { findPatientById, getPatientAppointments } from '@/lib/dummy-store';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const patient = findPatientById(id);

        if (!patient) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
        }

        const appointments = getPatientAppointments(id);

        return NextResponse.json({ ...patient, appointments });
    } catch (error) {
        console.error('Error fetching patient:', error);
        return NextResponse.json({ error: 'Failed to fetch patient' }, { status: 500 });
    }
}
