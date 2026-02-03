import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, Phone, Mail, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function PatientDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth();
    if (!session?.user) redirect('/admin/login');

    const { id } = await params;

    const patient = await prisma.patient.findUnique({
        where: { id },
        include: {
            appointments: {
                orderBy: { date: 'desc' },
            },
        },
    });

    if (!patient) notFound();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-green-100 text-green-800';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'COMPLETED': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <Link href="/admin/patients" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 mb-4 text-sm font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Patients
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Patient Info Card */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span>{patient.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <span>{patient.phone}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Patient since <span className="font-medium text-gray-900">{format(new Date(patient.createdAt), 'MMMM d, yyyy')}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Appointment History</h2>
                        </div>

                        {patient.appointments.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No appointment history found.</div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {patient.appointments.map((apt) => (
                                    <div key={apt.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{apt.serviceName}</h3>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {format(new Date(apt.date), 'MMM d, yyyy')}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {apt.timeSlot}
                                                    </div>
                                                </div>
                                                {apt.notes && (
                                                    <p className="mt-2 text-sm text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg inline-block">
                                                        "{apt.notes}"
                                                    </p>
                                                )}
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
