import { useRef, useEffect } from "react";
import { staggerFadeIn } from "@/lib/utils/animations";

interface UseStaggerOptions {
    staggerAmount?: number;
    delay?: number;
    duration?: number;
}

export function useStagger(selector: string, options: UseStaggerOptions = {}) {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll(selector);
        const tween = staggerFadeIn(elements, {
            stagger: options.staggerAmount,
            delay: options.delay,
            duration: options.duration,
        });

        return () => {
            tween.kill();
        };
    }, [selector, options.staggerAmount, options.delay, options.duration]);

    return containerRef;
}
