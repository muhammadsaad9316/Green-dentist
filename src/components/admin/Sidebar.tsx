'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard, Calendar, Users, BarChart as ChartIcon, Loader2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming cn is in utils, otherwise we'll define it locally or use valid import

const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { label: 'Patients', href: '/admin/patients', icon: Users },
    { label: 'Analytics', href: '/admin/analytics', icon: ChartIcon },
];

export default function Sidebar({ user }: { user: { name?: string | null; email?: string | null } }) {
    const path = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await signOut({ callbackUrl: '/admin/login' });
    };

    const isActive = (route: string) => path === route;

    return (
        <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-30">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                    <LayoutDashboard size={18} />
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">GreenAdmin</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium text-sm",
                            isActive(item.href)
                                ? "bg-green-50 text-green-700 shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <item.icon
                            size={18}
                            className={cn(
                                "transition-colors",
                                isActive(item.href) ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"
                            )}
                        />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                        {user.name?.[0] || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user.email}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium disabled:opacity-50"
                >
                    {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                    {isLoggingOut ? "Sign Out..." : "Sign Out"}
                </button>
            </div>
        </aside>
    );
}
