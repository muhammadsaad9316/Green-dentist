import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

// For Prisma Postgres optimization, we rely on the native client handling of the protocol
console.error('DEBUG: DATABASE_URL exists:', !!process.env.DATABASE_URL);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting database seed...');

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

    console.log('✅ Created admin user:', {
        email: admin.email,
        name: admin.name,
        role: admin.role,
    });

    // Create sample patient for testing
    const patient = await prisma.patient.upsert({
        where: { email: 'john.doe@example.com' },
        update: {},
        create: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
        },
    });

    console.log('✅ Created sample patient:', patient.name);

    // Create sample appointment for testing
    const appointment = await prisma.appointment.create({
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

    console.log('✅ Created sample appointment:', appointment.confirmationNumber);

    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
