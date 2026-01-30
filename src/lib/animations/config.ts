/**
 * Global animation configuration
 * The "Motion Design System" for Modern Dentist
 */
export const animationConfig = {
    // Global enable/disable
    enabled: true,

    // Duration Tokens (Seconds)
    duration: {
        shorter: 0.3,
        short: 0.6,
        medium: 0.9,
        long: 1.2,

        // Legacy/Aliases (keeping for compatibility during migration)
        fast: 0.3,
        normal: 0.6, // Adjusted to match 'short'
        slow: 0.9,   // Adjusted to match 'medium'
        verySlow: 1.2, // Adjusted to match 'long'
        xl: 1.5,
        xxl: 2.0
    },

    // Easing Tokens
    easing: {
        // The signature "Calm Luxury" ease
        // smooth: Starts fast, decelerates gently. Great for entrances.
        smooth: "power2.out",

        // For interactions requiring feedback (hover, click)
        excite: "back.out(1.7)",

        // For long, elegant transitions (page transitions, large movements)
        luxury: "power3.inOut",

        // Legacy
        bounce: "elastic.out(1, 0.3)",
        snappy: "back.out(1.7)", // Alias for excite
        linear: "none",
    },

    // Scroll trigger defaults
    scrollTrigger: {
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
    },

    // Stagger layout defaults
    stagger: {
        fast: 0.05,
        default: 0.1,
        slow: 0.2
    },
};

/**
 * Disable all animations (for accessibility/performance)
 */
export function disableAnimations() {
    animationConfig.enabled = false;
}

/**
 * Enable all animations
 */
export function enableAnimations() {
    animationConfig.enabled = true;
}
