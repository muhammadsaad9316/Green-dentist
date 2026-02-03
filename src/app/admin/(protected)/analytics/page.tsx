import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import StatCard from '@/components/admin/StatCard';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import AnalyticsCharts from '@/components/admin/AnalyticsCharts';

export default async function AnalyticsPage() {
    await auth(); // Ensure session

    // Fetch summary stats server-side for instant load
    const [totalAppointments, completedAppointments, pendingAppointments] = await Promise.all([
        prisma.appointment.count(),
        prisma.appointment.count({ where: { status: 'COMPLETED' } }),
        prisma.appointment.count({ where: { status: 'PENDING' } }),
    ]);

    return (
        <div className="p-8">
            <header className="mb-8 pl-1">
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-gray-500 mt-1">Deep dive into your clinic's performance</p>
            </header>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Lifetime Bookings"
                    value={totalAppointments}
                    icon={Calendar}
                    color="blue"
                />
                <StatCard
                    title="Successfully Completed"
                    value={completedAppointments}
                    icon={CheckCircle}
                    color="green"
                />
                <StatCard
                    title="Pending Actions"
                    value={pendingAppointments}
                    icon={Clock}
                    color="yellow"
                />
            </div>

            {/* Charts Section */}
            <AnalyticsCharts />
        </div>
    );
}
