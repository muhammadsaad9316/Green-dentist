"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { images } from "@/lib/images";
import { animationConfig } from "@/lib/animations/config";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const underlinePathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        if (!animationConfig.enabled) return;

        // 1. Setup Phase: Split Text
        // We use split-type to break the heading into lines/words for that premium reveal
        const split = SplitType.create(headingRef.current!, {
            types: 'lines,words',
            tagName: 'span'
        });

        // Wrap lines in a mask div for the "slide up from nothing" effect
        // This is a manual step often needed if SplitType doesn't add a mask wrapper effectively by default for this specific effect
        // But we can just animate the words from y: 100% if we set overflow: hidden on the lines.
        // SplitType gives us .line elements. We need to ensure they manage overflow.
        // A simple trick is to animate opacity and Y, but for "premium" feel, a mask is better.
        // Let's try animating the words directly first with a clip-path or simple Y/Opacity staggered.

        // Actually, for "Calm Confidence", a simple stagger of lines often looks best.

        const tl = gsap.timeline({
            defaults: { ease: animationConfig.easing.smooth }
        });

        // 2. The Timeline
        tl
            // A. Initial State set happens automatically via .from(), but explicit set is sometimes safer

            // B. Text Reveal (0.2s)
            .from(split.words, {
                y: 50,
                opacity: 0,
                duration: animationConfig.duration.long,
                stagger: animationConfig.stagger.fast,
                ease: "power3.out"
            }, 0.2)

            // C. Support Text (0.5s)
            .from(textRef.current, {
                y: 20,
                opacity: 0,
                duration: animationConfig.duration.medium, // approx 1s
            }, 0.5)

            // D. Image Reveal (0.6s) - Soft Focus Effect
            .from(imageContainerRef.current, {
                scale: 0.95,
                opacity: 0,
                duration: animationConfig.duration.xl, // approx 1.4s
                ease: animationConfig.easing.smooth
            }, 0.6)
            .from(imageRef.current, {
                scale: 1.1, // Start slightly zoomed in
                duration: 1.8, // Custom slow
                ease: animationConfig.easing.smooth
            }, 0.6) // Parallax feeling inside the container

            // E. UI Elements (Buttons & Stats) (0.8s)
            .from(buttonsRef.current, {
                y: 20,
                opacity: 0,
                duration: animationConfig.duration.medium,
            }, 0.8)
            .from(statsRef.current?.children || [], {
                y: 20,
                opacity: 0,
                duration: animationConfig.duration.medium,
                stagger: animationConfig.stagger.default
            }, 0.9);

        // Animate the underline SVG path (draw from left to right)
        if (underlinePathRef.current) {
            const path = underlinePathRef.current;
            const pathLength = path.getTotalLength();

            // Set initial state: path is hidden (dashoffset equals full length)
            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength
            });

            // Animate to visible (dashoffset = 0)
            tl.to(path, {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: "power2.out"
            }, 0.6); // Start slightly after heading begins animating
        }

        // 3. Parallax Background on Scroll
        gsap.to(bgRef.current, {
            y: "30%", // Move background slower than scroll
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // 4. Parallax Image on Scroll (The image container moves slightly differently)
        gsap.to(imageContainerRef.current, {
            y: "10%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // 5. Magnetic Button Effect
        const buttons = containerRef.current?.querySelectorAll(".magnetic-btn");
        const cleanups: (() => void)[] = [];

        buttons?.forEach((btn) => {
            const mouseMoveHandler = (e: any) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: "power2.out" });
            };

            const mouseLeaveHandler = () => {
                gsap.to(btn, { x: 0, y: 0, duration: animationConfig.duration.short, ease: animationConfig.easing.bounce });
            };

            btn.addEventListener("mousemove", mouseMoveHandler as any);
            btn.addEventListener("mouseleave", mouseLeaveHandler);

            cleanups.push(() => {
                btn.removeEventListener("mousemove", mouseMoveHandler as any);
                btn.removeEventListener("mouseleave", mouseLeaveHandler);
            });
        });

        // ... (stats animation)

        // Cleanup
        return () => {
            split.revert();
            cleanups.forEach(cleanup => cleanup());
        };

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-[133vh] flex items-start -mt-6 overflow-hidden bg-background">
            {/* Abstract Background Elements */}
            <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[60%] h-full bg-accent/20 rounded-l-[100px] transform translate-x-20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text Content */}
                <div className="space-y-10 max-w-xl">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 text-primary font-medium text-sm tracking-wide opacity-0 animate-fade-in">
                        Gentle. Thorough. No Judgement.
                    </div>

                    <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-foreground tracking-tight">
                        Dentistry that <br />
                        <span className="text-primary italic relative inline-block pr-4">
                            feels human.
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-secondary z-[-1]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path ref={underlinePathRef} d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="6" fill="none" className="opacity-60" />
                            </svg>
                        </span>
                    </h1>

                    <p ref={textRef} className="text-lg md:text-xl text-muted-foreground md:pr-10 font-light leading-relaxed">
                        We hate clinical coldness as much as you do.
                        Come in for a chat, a coffee, and the most comfortable dental care you've ever experienced.
                    </p>

                    <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 pt-2">
                        <Button size="lg" className="magnetic-btn rounded-xl px-8 py-7 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-primary text-primary-foreground border-0 ring-offset-2 ring-offset-background z-20">
                            Book a Visit
                        </Button>
                        <Button size="lg" variant="ghost" className="magnetic-btn rounded-xl px-8 py-7 text-lg hover:bg-transparent hover:text-primary group z-20">
                            (555) 123-4567
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Button>
                    </div>

                    <div ref={statsRef} className="pt-8 flex items-center gap-8 border-t border-border/50">
                        <div className="space-y-1">
                            <p className="font-serif text-3xl font-bold text-foreground">
                                <span className="stat-num" data-target="15">0</span>y
                            </p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Experience</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-serif text-3xl font-bold text-foreground">
                                <span className="stat-num" data-target="5">0</span>k+
                            </p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Happy Smiles</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <p className="font-serif text-3xl font-bold text-foreground">
                                    <span className="stat-num" data-target="4.9">0.0</span>
                                </p>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="star-icon w-4 h-4 fill-current" viewBox="0 0 24 24" stroke="none">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Star Rating</p>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div ref={imageContainerRef} className="relative h-[650px] w-full hidden md:block group perspective-1000">
                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700">
                        {/* Image Wrapper for Scaling */}
                        <div className="absolute inset-0 bg-stone-100">
                            <Image
                                ref={imageRef}
                                src={images.hero}
                                alt="Modern Dental Office"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Overlay Gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                    </div>

                    {/* Handwritten Note Effect */}
                    <div className="absolute -bottom-12 -left-12 bg-background/95 backdrop-blur-sm p-8 rounded-t-2xl rounded-bl-3xl rounded-br-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 z-20 max-w-xs rotate-[-3deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                        <p className="font-serif italic text-xl text-foreground leading-snug">
                            "Finally found a dentist I don't dread visiting."
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">SM</div>
                            <p className="text-xs text-muted-foreground font-sans font-bold uppercase tracking-wide">Sarah M.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
