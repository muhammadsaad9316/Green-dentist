import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animationConfig } from "@/lib/animations";

interface UseScrollAnimationOptions {
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
}

export function useScrollAnimation(
    animation: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline,
    options: UseScrollAnimationOptions = {}
) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!elementRef.current || !animationConfig.enabled) return;

        const ctx = gsap.context(() => {
            const tween = animation(elementRef.current!);

            ScrollTrigger.create({
                trigger: options.trigger || elementRef.current,
                start: options.start || animationConfig.scrollTrigger.start,
                end: options.end || animationConfig.scrollTrigger.end,
                animation: tween,
                scrub: options.scrub,
                markers: options.markers,
                onEnter: options.onEnter,
                onLeave: options.onLeave,
            });
        });

        return () => ctx.revert();
    }, [animation, options]);

    return elementRef;
}
