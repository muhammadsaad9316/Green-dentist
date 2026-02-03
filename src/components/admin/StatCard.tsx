

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
        positive: boolean;
    };
    color?: 'green' | 'blue' | 'yellow' | 'purple';
}

export default function StatCard({ title, value, icon: Icon, trend, color = 'green' }: StatCardProps) {
    const colors = {
        green: 'bg-green-50 text-green-600',
        blue: 'bg-blue-50 text-blue-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 font-medium text-sm">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={`font-medium ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
                        {trend.positive ? '+' : ''}{trend.value}%
                    </span>
                    <span className="text-gray-400 ml-2">{trend.label}</span>
                </div>
            )}
        </div>
    );
}
