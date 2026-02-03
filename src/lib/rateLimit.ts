// Simple In-Memory Rate Limiter using Map (No external dependencies)

// Simple In-Memory Rate Limiter using Map
// Note: This resets on server restart. For persistent limiting across scaling, use Redis.
// Designed for "Tier 1" simplicity as per instructions.

type RateLimitContext = {
    count: number;
    resetTime: number;
};

const limits = new Map<string, RateLimitContext>();

/**
 * Basic Window Rate Limiter
 * @param key Unique key (e.g. IP address or User ID)
 * @param limit Max requests
 * @param windowMs Time window in milliseconds
 * @returns { success: boolean, remaining: number, reset: number }
 */
export function rateLimit(key: string, limit: number = 100, windowMs: number = 60 * 1000) {
    const now = Date.now();
    const record = limits.get(key);

    if (!record || now > record.resetTime) {
        // Reset or new
        limits.set(key, {
            count: 1,
            resetTime: now + windowMs
        });
        return { success: true, remaining: limit - 1, reset: now + windowMs };
    }

    // Existing window
    if (record.count >= limit) {
        return { success: false, remaining: 0, reset: record.resetTime };
    }

    record.count += 1;
    return { success: true, remaining: limit - record.count, reset: record.resetTime };
}

// Cleanup interval (optional, simple Map grows but we can assume modest traffic for this prototype)
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of limits.entries()) {
        if (now > record.resetTime) {
            limits.delete(key);
        }
    }
}, 60 * 1000); // Clean every minute
