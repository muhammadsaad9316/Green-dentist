'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { signIn } from 'next-auth/react'; // Client-side sign in
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginEvaluated = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginEvaluated>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginEvaluated) => {
        setLoading(true);
        try {
            // Use next-auth client-side signIn
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                toast.error('Invalid credentials');
                setLoading(false);
            } else {
                toast.success('Login successful!');
                router.push('/admin');
                router.refresh();
            }
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
            console.error(error);
        }
    };

    // Modern UI for login form
    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                <p className="text-gray-500 mt-2">Sign in to manage the clinic</p>
            </div>

            {/* Test Credentials Banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                        ℹ
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-2">Test Credentials</p>
                        <div className="space-y-1 text-sm text-blue-800">
                            <p className="font-mono bg-blue-100 px-2 py-1 rounded">
                                <span className="font-semibold">Email:</span> admin@greendentist.com
                            </p>
                            <p className="font-mono bg-blue-100 px-2 py-1 rounded">
                                <span className="font-semibold">Password:</span> admin123
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="admin@greendentist.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder:text-gray-400"
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>
        </div>
    );
}
