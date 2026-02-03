import AppointmentsTable from '@/components/admin/AppointmentsTable';

export default function AppointmentsPage() {
    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
                <p className="text-gray-500 mt-1">Manage all patient bookings and schedules</p>
            </header>

            <AppointmentsTable />
        </div>
    );
}
