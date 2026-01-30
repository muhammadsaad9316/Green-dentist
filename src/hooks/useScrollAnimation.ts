import { useRef } from "react";
import { useGSAP } from "@gsap/react";
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

    useGSAP(() => {
        if (!elementRef.current || !animationConfig.enabled) return;

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
    }, { scope: elementRef, dependencies: [animation, options] });

    return elementRef;
}
