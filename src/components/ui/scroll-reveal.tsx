"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up" | "blur-in";
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    threshold?: number; // 0 to 1, how much of element visible to trigger
    once?: boolean;
}

export function ScrollReveal({
    children,
    className,
    animation = "fade-up",
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = "power3.out",
    threshold = 0.1,
    once = true,
}: ScrollRevealProps) {
    const el = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const element = el.current;
        if (!element) return;

        let initialVars: gsap.TweenVars = { opacity: 0 };

        switch (animation) {
            case "fade-up":
                initialVars = { opacity: 0, y: 50 };
                break;
            case "fade-in":
                initialVars = { opacity: 0 };
                break;
            case "slide-left":
                initialVars = { opacity: 0, x: 50 };
                break;
            case "slide-right":
                initialVars = { opacity: 0, x: -50 };
                break;
            case "scale-up":
                initialVars = { opacity: 0, scale: 0.8 };
                break;
            case "blur-in":
                initialVars = { opacity: 0, filter: "blur(10px)", scale: 0.95 };
                break;
        }

        gsap.fromTo(
            element.children,
            initialVars,
            {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: duration,
                delay: delay,
                stagger: stagger,
                ease: ease,
                scrollTrigger: {
                    trigger: element,
                    start: `top ${100 - (threshold * 100)}%`, // e.g. "top 90%"
                    toggleActions: once ? "play none none none" : "play none none reverse",
                }
            }
        );
    }, { scope: el });

    return (
        <div ref={el} className={cn(className)}>
            {children}
        </div>
    );
}
