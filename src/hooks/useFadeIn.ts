import { useRef, useEffect } from "react";
import { fadeIn } from "@/lib/utils/animations";

interface UseFadeInOptions {
    delay?: number;
    duration?: number;
    onComplete?: () => void;
}

export function useFadeIn(options: UseFadeInOptions = {}) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const tween = fadeIn(elementRef.current, {
            delay: options.delay,
            duration: options.duration,
            onComplete: options.onComplete,
        });

        return () => {
            tween.kill();
        };
    }, [options.delay, options.duration, options.onComplete]);

    return elementRef;
}
