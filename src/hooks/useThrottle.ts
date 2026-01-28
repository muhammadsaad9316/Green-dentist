import { useRef, useCallback } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): T {
    const lastRun = useRef(0);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();

            if (now - lastRun.current >= delay) {
                func(...args);
                lastRun.current = now;
            } else {
                // Optional: Run trailing edge? 
                // For rate limiting submissions, we usually just drop calls.
                // But for throttle, usually we want at least one run?
                // Let's implement simple drop-if-too-soon (which is essentially rate limiting).
                // If strict throttle (run at most once per delay), drop is correct.
            }
        },
        [func, delay]
    ) as T;
}
