"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { disableAnimations } from "@/lib/animations/config";

gsap.registerPlugin(ScrollTrigger);

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// ...

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        // 1. Accessibility Check
        if (prefersReducedMotion) {
            disableAnimations();
            return; // Skip Lenis for native scroll
        }

        // 2. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        // 3. Sync GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // 4. Sync RAF Loop
        // Use GSAP's ticker for highest fidelity sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            // Cleanup
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, [prefersReducedMotion]);

    return <div className="min-h-screen flex flex-col">{children}</div>;
}

