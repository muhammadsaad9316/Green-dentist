'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type AnalyticsData = {
    bookingTrends: { date: string; count: number }[];
    statusBreakdown: { status: string; count: number }[];
    popularServices: { serviceName: string; count: number }[];
};

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6']; // Green, Yellow, Red, Blue

export default function AnalyticsCharts() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch('/api/admin/analytics');
                if (!res.ok) throw new Error('Failed to fetch analytics');
                const jsonData = await res.json();
                setData(jsonData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="h-64 flex items-center justify-center text-gray-400"><Loader2 className="animate-spin w-8 h-8" /></div>;
    if (!data) return <div className="h-64 flex items-center justify-center text-gray-400">Failed to load data</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Trends Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Trends (Last 7 Days)</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.bookingTrends}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ stroke: '#10B981', strokeWidth: 1 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{ stroke: '#10B981', strokeWidth: 2, r: 4, fill: 'white' }}
                                activeDot={{ r: 6, fill: '#10B981' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Status Distribution Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointment Status</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.statusBreakdown}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="count"
                            >
                                {data.statusBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Popular Services - Simple List */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.popularServices.map((service, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="font-medium text-gray-700">{service.serviceName}</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">{service.count} bookings</span>
                        </div>
                    ))}
                    {data.popularServices.length === 0 && <p className="text-gray-500 text-sm">No data available yet.</p>}
                </div>
            </div>
        </div>
    );
}
