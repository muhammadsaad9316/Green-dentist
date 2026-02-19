/**
 * dummy-store.ts
 * In-memory data store for demo/presentation mode.
 * No database required. Data resets on server restart.
 * DO NOT USE IN PRODUCTION.
 */

import { format, subDays } from 'date-fns';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Appointment {
    id: string;
    confirmationNumber: string;
    serviceId: string;
    serviceName: string;
    date: Date;
    timeSlot: string;
    patientId: string;
    notes?: string;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
    // Joined patient (always populated in dummy store)
    patient: Pick<Patient, 'name' | 'email' | 'phone'>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _idCounter = 1000;
export function generateId(): string {
    return `dummy_${++_idCounter}`;
}

export function generateConfirmationNumber(): string {
    return `GD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const seedPatients: Patient[] = [
    { id: 'p1', name: 'Alice Johnson', email: 'alice@example.com', phone: '03001234567', createdAt: subDays(new Date(), 30), updatedAt: subDays(new Date(), 30) },
    { id: 'p2', name: 'Bob Smith', email: 'bob@example.com', phone: '03009876543', createdAt: subDays(new Date(), 25), updatedAt: subDays(new Date(), 25) },
    { id: 'p3', name: 'Carol White', email: 'carol@example.com', phone: '03005551234', createdAt: subDays(new Date(), 20), updatedAt: subDays(new Date(), 20) },
    { id: 'p4', name: 'David Brown', email: 'david@example.com', phone: '03001112233', createdAt: subDays(new Date(), 15), updatedAt: subDays(new Date(), 15) },
    { id: 'p5', name: 'Emma Davis', email: 'emma@example.com', phone: '03004445566', createdAt: subDays(new Date(), 10), updatedAt: subDays(new Date(), 10) },
];

const seedAppointments: Appointment[] = [
    {
        id: 'a1', confirmationNumber: 'GD-DEMO001', serviceId: 'teeth-whitening', serviceName: 'Teeth Whitening',
        date: subDays(new Date(), 5), timeSlot: '10:00 AM', patientId: 'p1', status: 'COMPLETED',
        createdAt: subDays(new Date(), 6), updatedAt: subDays(new Date(), 5),
        patient: { name: 'Alice Johnson', email: 'alice@example.com', phone: '03001234567' },
    },
    {
        id: 'a2', confirmationNumber: 'GD-DEMO002', serviceId: 'dental-cleaning', serviceName: 'Dental Cleaning',
        date: subDays(new Date(), 3), timeSlot: '02:00 PM', patientId: 'p2', status: 'CONFIRMED',
        createdAt: subDays(new Date(), 4), updatedAt: subDays(new Date(), 3),
        patient: { name: 'Bob Smith', email: 'bob@example.com', phone: '03009876543' },
    },
    {
        id: 'a3', confirmationNumber: 'GD-DEMO003', serviceId: 'root-canal', serviceName: 'Root Canal',
        date: subDays(new Date(), 1), timeSlot: '11:00 AM', patientId: 'p3', status: 'PENDING',
        createdAt: subDays(new Date(), 2), updatedAt: subDays(new Date(), 1),
        patient: { name: 'Carol White', email: 'carol@example.com', phone: '03005551234' },
    },
    {
        id: 'a4', confirmationNumber: 'GD-DEMO004', serviceId: 'braces-consultation', serviceName: 'Braces Consultation',
        date: new Date(), timeSlot: '09:00 AM', patientId: 'p4', status: 'PENDING',
        createdAt: subDays(new Date(), 1), updatedAt: subDays(new Date(), 1),
        patient: { name: 'David Brown', email: 'david@example.com', phone: '03001112233' },
    },
    {
        id: 'a5', confirmationNumber: 'GD-DEMO005', serviceId: 'teeth-whitening', serviceName: 'Teeth Whitening',
        date: subDays(new Date(), 8), timeSlot: '03:00 PM', patientId: 'p5', status: 'CANCELLED',
        createdAt: subDays(new Date(), 9), updatedAt: subDays(new Date(), 8),
        patient: { name: 'Emma Davis', email: 'emma@example.com', phone: '03004445566' },
    },
    {
        id: 'a6', confirmationNumber: 'GD-DEMO006', serviceId: 'dental-cleaning', serviceName: 'Dental Cleaning',
        date: subDays(new Date(), 2), timeSlot: '01:00 PM', patientId: 'p1', status: 'COMPLETED',
        createdAt: subDays(new Date(), 3), updatedAt: subDays(new Date(), 2),
        patient: { name: 'Alice Johnson', email: 'alice@example.com', phone: '03001234567' },
    },
];

// ─── Mutable in-memory store ──────────────────────────────────────────────────

const store = {
    patients: [...seedPatients] as Patient[],
    appointments: [...seedAppointments] as Appointment[],
};

// ─── Patient helpers ──────────────────────────────────────────────────────────

export function getAllPatients() {
    return store.patients;
}

export function findPatientById(id: string): Patient | undefined {
    return store.patients.find(p => p.id === id);
}

export function findPatientByEmail(email: string): Patient | undefined {
    return store.patients.find(p => p.email === email);
}

export function upsertPatient(data: { name: string; email: string; phone: string }): Patient {
    const existing = findPatientByEmail(data.email);
    if (existing) {
        existing.name = data.name;
        existing.phone = data.phone;
        existing.updatedAt = new Date();
        return existing;
    }
    const patient: Patient = {
        id: generateId(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    store.patients.push(patient);
    return patient;
}

export function getPatientAppointments(patientId: string): Appointment[] {
    return store.appointments
        .filter(a => a.patientId === patientId)
        .sort((a, b) => b.date.getTime() - a.date.getTime());
}

// ─── Appointment helpers ───────────────────────────────────────────────────────

export function getAllAppointments(): Appointment[] {
    return store.appointments;
}

export function findAppointmentById(id: string): Appointment | undefined {
    return store.appointments.find(a => a.id === id);
}

export function createAppointment(data: {
    serviceId: string;
    serviceName: string;
    date: Date;
    timeSlot: string;
    patientId: string;
    notes?: string;
    patient: Pick<Patient, 'name' | 'email' | 'phone'>;
}): Appointment {
    const appointment: Appointment = {
        id: generateId(),
        confirmationNumber: generateConfirmationNumber(),
        serviceId: data.serviceId,
        serviceName: data.serviceName,
        date: data.date,
        timeSlot: data.timeSlot,
        patientId: data.patientId,
        notes: data.notes,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        patient: data.patient,
    };
    store.appointments.push(appointment);
    return appointment;
}

export function updateAppointment(id: string, data: Partial<Pick<Appointment, 'date' | 'timeSlot' | 'notes' | 'serviceId' | 'status'>>): Appointment | null {
    const appt = findAppointmentById(id);
    if (!appt) return null;
    if (data.date !== undefined) appt.date = data.date;
    if (data.timeSlot !== undefined) appt.timeSlot = data.timeSlot;
    if (data.notes !== undefined) appt.notes = data.notes;
    if (data.serviceId !== undefined) appt.serviceId = data.serviceId;
    if (data.status !== undefined) appt.status = data.status;
    appt.updatedAt = new Date();
    return appt;
}

export function deleteAppointment(id: string): boolean {
    const idx = store.appointments.findIndex(a => a.id === id);
    if (idx === -1) return false;
    store.appointments.splice(idx, 1);
    return true;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export function computeAnalytics(days: number) {
    const appts = store.appointments;
    const today = new Date();
    const startDate = subDays(today, days);

    // Status breakdown
    const statusMap: Record<string, number> = {};
    for (const a of appts) {
        statusMap[a.status] = (statusMap[a.status] || 0) + 1;
    }
    const statusBreakdown = Object.entries(statusMap).map(([status, count]) => ({ status, count }));

    // Booking trends (last N days)
    const trendMap = new Map<string, number>();
    for (let i = 0; i <= days; i++) {
        trendMap.set(format(subDays(today, i), 'yyyy-MM-dd'), 0);
    }
    for (const a of appts) {
        if (a.createdAt >= startDate) {
            const key = format(a.createdAt, 'yyyy-MM-dd');
            if (trendMap.has(key)) trendMap.set(key, (trendMap.get(key) || 0) + 1);
        }
    }
    const bookingTrends = Array.from(trendMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

    // Popular services (top 5)
    const serviceMap: Record<string, number> = {};
    for (const a of appts) {
        serviceMap[a.serviceName] = (serviceMap[a.serviceName] || 0) + 1;
    }
    const popularServices = Object.entries(serviceMap)
        .map(([serviceName, count]) => ({ serviceName, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return {
        statusBreakdown,
        bookingTrends,
        totalPatients: store.patients.length,
        popularServices,
    };
}
