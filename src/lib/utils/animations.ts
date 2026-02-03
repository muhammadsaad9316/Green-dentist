import { gsap } from "gsap";
import { animationConfig, animationPresets, type AnimationPreset } from "../animations";

/**
 * Create a fade-in animation
 */
export function fadeIn(target: gsap.TweenTarget, options?: gsap.TweenVars): gsap.core.Tween {
    if (!animationConfig.enabled) return gsap.to(target, { duration: 0 });

    return gsap.fromTo(target, animationPresets.fadeIn.from, {
        ...animationPresets.fadeIn.to,
        ...options,
    });
}

/**
 * Create a stagger fade-in animation
 */
export function staggerFadeIn(
    targets: gsap.TweenTarget,
    options?: gsap.TweenVars
): gsap.core.Tween {
    if (!animationConfig.enabled) return gsap.to(targets, { duration: 0 });

    return gsap.fromTo(targets, animationPresets.fadeInUp.from, {
        ...animationPresets.fadeInUp.to,
        stagger: animationConfig.stagger.default,
        ...options,
    });
}

/**
 * Apply animation preset
 */
export function applyPreset(
    target: gsap.TweenTarget,
    preset: AnimationPreset,
    options?: gsap.TweenVars
): gsap.core.Tween {
    if (!animationConfig.enabled) return gsap.to(target, { duration: 0 });

    const animation = animationPresets[preset];

    if ("from" in animation) {
        return gsap.fromTo(target, animation.from, { ...animation.to, ...options });
    } else {
        return gsap.to(target, { ...animation.to, ...options });
    }
}
