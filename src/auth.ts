import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

// Demo credentials — insecure by design, for presentation only
const DEMO_EMAIL = 'admin@greendentist.com';
const DEMO_PASSWORD = 'demo1234';
const DEMO_ADMIN = { id: 'demo-admin', name: 'Demo Admin', email: DEMO_EMAIL, role: 'ADMIN' };

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = LoginSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { email, password } = parsed.data;

                if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                    return DEMO_ADMIN;
                }

                return null;
            },
        }),
    ],
});
