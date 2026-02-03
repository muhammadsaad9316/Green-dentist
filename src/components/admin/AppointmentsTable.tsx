'use client';

import { useState, useEffect } from 'react';
import {
    Search, Filter, Calendar as CalendarIcon, MoreVertical,
    Check, X, Clock, Trash2, Edit2, ChevronLeft, ChevronRight,
    Loader2, Plus
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import AppointmentModal from './AppointmentModal';

type Appointment = {
    id: string;
    confirmationNumber: string;
    serviceName: string;
    date: string;
    timeSlot: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    notes?: string;
    patient: {
        name: string;
        email: string;
        phone: string;
    };
};

export default function AppointmentsTable() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (statusFilter !== 'ALL') params.append('status', statusFilter);

            const res = await fetch(`/api/admin/appointments?${params.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setAppointments(data);
        } catch (error) {
            toast.error('Failed to load appointments');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAppointments();
        }, 300);
        return () => clearTimeout(timer);
    }, [search, statusFilter]);

    const updateStatus = async (id: string, newStatus: string) => {
        setAppointments(prev => prev.map(a =>
            a.id === id ? { ...a, status: newStatus as any } : a
        ));
        toast.info(`Updating status...`);

        try {
            const res = await fetch(`/api/admin/appointments/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error('Failed to update');
            toast.success('Status updated');
        } catch (error) {
            toast.error('Failed to update status');
            fetchAppointments();
        }
    };

    const deleteAppointment = async (id: string) => {
        if (!confirm('Are you sure you want to delete this appointment?')) return;

        try {
            const res = await fetch(`/api/admin/appointments/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete');

            setAppointments(prev => prev.filter(a => a.id !== id));
            toast.success('Appointment deleted');
        } catch (error) {
            toast.error('Failed to delete appointment');
        }
    };

    const handleEdit = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedAppointment(undefined);
        setIsModalOpen(true);
    };

    const handleModalSuccess = () => {
        fetchAppointments();
        setIsModalOpen(false);
    };

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
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or confirmation #..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900 placeholder:text-gray-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500 bg-white text-sm text-gray-900"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>

                        <button
                            onClick={handleCreate}
                            className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            New
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-2" />
                            <p>Loading appointments...</p>
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                            <CalendarIcon className="w-12 h-12 mb-4 opacity-50" />
                            <p>No appointments found.</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50 text-left">
                                    <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Patient Info</th>
                                    <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Appointment</th>
                                    <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointments.map((apt) => (
                                    <tr key={apt.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{apt.patient.name}</span>
                                                <span className="text-sm text-gray-500">{apt.patient.email}</span>
                                                <span className="text-xs text-gray-400">{apt.patient.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{apt.serviceName}</span>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                                    <CalendarIcon className="w-3 h-3" />
                                                    <span>{format(new Date(apt.date), 'MMM d, yyyy')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{apt.timeSlot}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-green-500/20 outline-none appearance-none ${getStatusColor(apt.status)}`}
                                                value={apt.status}
                                                onChange={(e) => updateStatus(apt.id, e.target.value)}
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="CONFIRMED">CONFIRMED</option>
                                                <option value="COMPLETED">COMPLETED</option>
                                                <option value="CANCELLED">CANCELLED</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(apt)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Details"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteAppointment(apt.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Appointment"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleModalSuccess}
                appointment={selectedAppointment}
            />
        </>
    );
}
