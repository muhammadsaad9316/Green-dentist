'use client';

import { useState, useEffect } from 'react';
import { Search, Phone, Mail, ChevronRight, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type Patient = {
    id: string;
    name: string;
    email: string;
    phone: string;
    _count: {
        appointments: number;
    };
};

export default function PatientsTable() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);

            const res = await fetch(`/api/admin/patients?${params.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setPatients(data.patients);
        } catch (error) {
            toast.error('Failed to load patients');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPatients();
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search patients by name, email or phone..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900 placeholder:text-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <p>Loading patients...</p>
                    </div>
                ) : patients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                        <Users className="w-12 h-12 mb-4 opacity-50" />
                        <p>No patients found.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50 text-left">
                                <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Total Visits</th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0">
                                                {patient.name[0]}
                                            </div>
                                            <span className="font-medium text-gray-900">{patient.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-sm text-gray-600 gap-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                {patient.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                {patient.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {patient._count.appointments} visits
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/patients/${patient.id}`}
                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                        >
                                            View Details
                                            <ChevronRight className="w-3 h-3 ml-1" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
