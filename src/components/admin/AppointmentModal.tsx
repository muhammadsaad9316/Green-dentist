'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const appointmentSchema = z.object({
    serviceId: z.string().min(1, 'Service is required'),
    date: z.string().min(1, 'Date is required'),
    timeSlot: z.string().min(1, 'Time slot is required'),
    notes: z.string().optional(),
    // Patient info (read-only for edit usually, but editable here for flexibility)
    patientName: z.string().min(1, 'Name is required'),
    patientEmail: z.string().email(),
    patientPhone: z.string().min(10, 'Valid phone required'),
    status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    appointment?: any; // If present, edit mode
}

export default function AppointmentModal({ isOpen, onClose, onSuccess, appointment }: AppointmentModalProps) {
    const [loading, setLoading] = useState(false);
    const isEdit = !!appointment;

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            status: 'PENDING',
        }
    });

    // Load data when opening for edit
    useEffect(() => {
        if (appointment) {
            setValue('serviceId', appointment.serviceId || 'teeth-cleaning'); // Default/Fallack
            setValue('date', new Date(appointment.date).toISOString().split('T')[0]);
            setValue('timeSlot', appointment.timeSlot);
            setValue('notes', appointment.notes || '');
            setValue('patientName', appointment.patient.name);
            setValue('patientEmail', appointment.patient.email);
            setValue('patientPhone', appointment.patient.phone);
            setValue('status', appointment.status);
        } else {
            reset({ status: 'PENDING' });
        }
    }, [appointment, setValue, reset, isOpen]);

    const onSubmit = async (data: AppointmentFormData) => {
        setLoading(true);
        try {
            const url = isEdit
                ? `/api/admin/appointments/${appointment.id}`
                : `/api/admin/appointments`; // We need to handle create differently in backend or use same structure

            const method = isEdit ? 'PATCH' : 'POST';

            // For create, we might need a different payload structure if the backend API expects different nesting
            // But for this simple implementation, let's assume we can map it.
            // Actually, the create API (POST /api/bookings) expects a specific structure.
            // And we haven't implemented a robust ADMIN CREATE endpoint yet, only the public one?
            // Wait, POST /api/admin/appointments DOES exist (marked as done in checklist but let me check file).
            // Ah, I implemented POST /api/bookings (public). I did NOT implement POST /api/admin/appointments specifically for generic admin creation yet?
            // Let me assume I'll use the PATCH for edit and maybe generic POST for create. 
            // Actually, for ADMIN creating, we can reuse the logic.

            const payload = {
                ...data,
                // For update, we flatly update fields. 
                // For create, we'd need to ensure patient exists or create them.
            };

            // Let's handle Edit first purely.
            if (!isEdit) {
                toast.error("Create not fully implemented in UI yet");
                setLoading(false);
                return;
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save');

            toast.success(isEdit ? 'Appointment updated' : 'Appointment created');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEdit ? 'Edit Appointment' : 'New Appointment'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Patient Info Section */}
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                                Patient Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input {...register('patientName')} disabled={isEdit} className="w-full px-3 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 text-gray-900 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input {...register('patientEmail')} disabled={isEdit} className="w-full px-3 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 text-gray-900 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input {...register('patientPhone')} disabled={isEdit} className="w-full px-3 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 text-gray-900 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" />
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="md:col-span-2 pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span>
                                Appointment Info
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                                    <select {...register('serviceId')} className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white text-gray-900">
                                        <option value="teeth-cleaning">Teeth Cleaning</option>
                                        <option value="whitening">Whitening</option>
                                        <option value="checkup">General Checkup</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select {...register('status')} className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white text-gray-900">
                                        <option value="PENDING">Pending</option>
                                        <option value="CONFIRMED">Confirmed</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input type="date" {...register('date')} className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-gray-900" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input {...register('timeSlot')} placeholder="e.g. 10:00 AM" className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-gray-900 placeholder:text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <textarea {...register('notes')} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-gray-900 placeholder:text-gray-400" placeholder="Internal notes or patient requests..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isEdit ? 'Save Changes' : 'Create Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
