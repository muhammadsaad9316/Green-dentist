export async function getCsrfToken(): Promise<string> {
    // In a real app, this might fetch from an endpoint like /api/auth/csrf
    // For now, we return a mock token or read from a meta tag if available
    if (typeof document !== 'undefined') {
        const meta = document.querySelector('meta[name="csrf-token"]');
        if (meta) return meta.getAttribute('content') || '';
    }
    return "mock-csrf-token-" + Math.random().toString(36).substring(7);
}
