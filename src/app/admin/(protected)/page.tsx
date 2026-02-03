import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import StatCard from '@/components/admin/StatCard';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function AdminDashboard() {
    const session = await auth();

    // Fetch real data
    const [
        totalAppointments,
        pendingAppointments,
        todayAppointments,
        totalPatients
    ] = await Promise.all([
        prisma.appointment.count(),
        prisma.appointment.count({ where: { status: 'PENDING' } }),
        prisma.appointment.count({
            where: {
                date: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lt: new Date(new Date().setHours(23, 59, 59, 999)),
                }
            }
        }),
        prisma.patient.count(),
    ]);

    // Fetch recent appointments
    const recentAppointments = await prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { patient: true },
    });

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, {session?.user?.name}</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Appointments"
                    value={totalAppointments}
                    icon={Calendar}
                    color="blue"
                />
                <StatCard
                    title="Pending Requests"
                    value={pendingAppointments}
                    icon={Clock}
                    color="yellow"
                />
                <StatCard
                    title="Today's Schedule"
                    value={todayAppointments}
                    icon={CheckCircle}
                    color="green"
                />
                <StatCard
                    title="Total Patients"
                    value={totalPatients}
                    icon={Users}
                    color="purple"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                        <Link href="/admin/appointments" className="text-sm text-green-600 hover:text-green-700 font-medium">
                            View All
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-100">
                                    <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Patient</th>
                                    <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                                    <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="pb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentAppointments.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-500">
                                            No appointments found.
                                        </td>
                                    </tr>
                                ) : (
                                    recentAppointments.map((apt) => (
                                        <tr key={apt.id} className="group">
                                            <td className="py-4">
                                                <div className="ml-2">
                                                    <p className="text-sm font-medium text-gray-900">{apt.patient.name}</p>
                                                    <p className="text-xs text-gray-500">{apt.patient.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 text-sm text-gray-600">{apt.serviceName}</td>
                                            <td className="py-4 text-sm text-gray-600">
                                                {format(new Date(apt.date), 'MMM d, yyyy')} <br />
                                                <span className="text-xs text-gray-400">{apt.timeSlot}</span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${apt.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                        apt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                            apt.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                                'bg-blue-100 text-blue-800'}`}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h2 className="text-lg font-semibold text-green-900 mb-4">Quick Tips</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                            <p className="text-sm text-green-800">Check "Pending Requests" daily to confirm appointments promptly.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                            <p className="text-sm text-green-800">Verify patient insurance details before their visit.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                            <p className="text-sm text-green-800">Use the "Notes" section to track special patient requirements.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
