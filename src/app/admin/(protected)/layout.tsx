import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/admin/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Component - already handles client-side navigation logic */}
            <Sidebar user={session.user} />

            {/* Main Content with margin to account for fixed sidebar */}
            <main className="flex-1 md:ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
