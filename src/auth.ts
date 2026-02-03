import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Schema for login validation
const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = LoginSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await prisma.admin.findUnique({
                        where: { email },
                    });

                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) {
                        // Return user object compatible with NextAuth
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
