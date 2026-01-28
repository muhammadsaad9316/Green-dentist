import { animationConfig } from "./config";

/**
 * Common animation presets
 * Using the "Motion Design System" tokens
 */
export const animationPresets = {
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: animationConfig.duration.short },
    },

    fadeInUp: {
        from: { opacity: 0, y: 30 },
        to: {
            opacity: 1,
            y: 0,
            duration: animationConfig.duration.short,
            ease: animationConfig.easing.smooth,
        },
    },

    fadeInDown: {
        from: { opacity: 0, y: -30 },
        to: {
            opacity: 1,
            y: 0,
            duration: animationConfig.duration.short,
            ease: animationConfig.easing.smooth,
        },
    },

    slideInLeft: {
        from: { opacity: 0, x: -50 },
        to: {
            opacity: 1,
            x: 0,
            duration: animationConfig.duration.short,
            ease: animationConfig.easing.smooth,
        },
    },

    slideInRight: {
        from: { opacity: 0, x: 50 },
        to: {
            opacity: 1,
            x: 0,
            duration: animationConfig.duration.short,
            ease: animationConfig.easing.smooth,
        },
    },

    scaleIn: {
        from: { opacity: 0, scale: 0.9 }, // Adjusted for subtler "luxury" feel
        to: {
            opacity: 1,
            scale: 1,
            duration: animationConfig.duration.medium,
            ease: animationConfig.easing.luxury, // Using luxury ease
        },
    },

    pulse: {
        to: {
            scale: 1.05,
            duration: animationConfig.duration.shorter,
            ease: animationConfig.easing.excite,
            yoyo: true,
            repeat: -1,
        },
    },

    // New "Hero" specific preset parts if needed, though Hero will likely use custom timelines
    heroTextReveal: {
        from: { y: "100%" },
        to: { y: "0%", duration: 1, ease: "power4.out" }
    }
} as const;

export type AnimationPreset = keyof typeof animationPresets;
