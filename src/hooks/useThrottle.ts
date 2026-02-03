import { useRef, useCallback } from 'react';

// T extends function with unknown args and return type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): T {
    const lastRun = useRef(0);

    return useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();

            if (now - lastRun.current >= delay) {
                func(...args);
                lastRun.current = now;
            }
        },
        [func, delay]
    ) as T;
}
