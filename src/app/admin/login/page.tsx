import LoginForm from '@/components/admin/LoginForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="mb-8 w-full max-w-md">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Website
                </Link>

                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        {/* Logo placeholder */}
                        <span className="text-white font-bold text-xl">CD</span>
                    </div>
                </div>
            </div>

            <LoginForm />

            <div className="mt-8 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Green Dentist. Admin Access Only.</p>
            </div>
        </div>
    );
}
