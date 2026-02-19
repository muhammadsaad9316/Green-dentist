import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith('/admin');
            const isLoginPage = nextUrl.pathname === '/admin/login';

            if (isAdminPage) {
                if (isLoginPage) return true;
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        // Add role to session
        async session({ session, token }) {
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user && user.role) {
                token.role = user.role;
            }
            return token;
        },
    },
    providers: [], // Configured in auth.ts
    trustHost: true,
} satisfies NextAuthConfig;
