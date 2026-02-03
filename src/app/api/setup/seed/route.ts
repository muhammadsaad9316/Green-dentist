import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        console.log('🌱 Starting database seed via API...');

        // Create default admin user
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);

        const admin = await prisma.admin.upsert({
            where: { email: 'admin@greendentist.com' },
            update: {},
            create: {
                email: 'admin@greendentist.com',
                name: 'Admin User',
                password: adminPassword,
                role: 'SUPER_ADMIN',
            },
        });

        // Create sample patient
        const patient = await prisma.patient.upsert({
            where: { email: 'john.doe@example.com' },
            update: {},
            create: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1 (555) 123-4567',
            },
        });

        // Create sample appointment
        // Check if exists first to avoid duplicate confirmation number error on re-run
        const existingApt = await prisma.appointment.findUnique({
            where: { confirmationNumber: 'GD-TEST-001' }
        });

        if (!existingApt) {
            await prisma.appointment.create({
                data: {
                    confirmationNumber: 'GD-TEST-001',
                    serviceId: 'teeth-cleaning',
                    serviceName: 'Professional Teeth Cleaning',
                    date: new Date('2026-02-15T10:00:00Z'),
                    timeSlot: '10:00 AM',
                    patientId: patient.id,
                    notes: 'First-time patient, routine cleaning',
                    status: 'CONFIRMED',
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            admin: admin.email
        });

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
