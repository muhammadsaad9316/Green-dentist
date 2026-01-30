"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    { year: "2010", title: "Practice Founded", description: "Dr. Mitchell opens the first clinic with a vision for patient-centered care." },
    { year: "2015", title: "Expansion & Renovation", description: "Doubled our capacity and introduced state-of-the-art 3D imaging technology." },
    { year: "2019", title: "Pediatric Wing", description: "Opened a dedicated wing designed specifically for children&apos;s comfort." },
    { year: "2023", title: "Award Winning Care", description: "Voted top dental practice in the city for the 5th consecutive year." },
];

export function PracticeTimeline() {
    const container = useRef(null);
    const lineRef = useRef(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // Line drawing animation
        gsap.fromTo(lineRef.current,
            { height: "0%" },
            {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 0.5,
                }
            }
        );

        // Items fade in
        itemsRef.current.forEach((item) => {
            gsap.from(item, {
                opacity: 0,
                x: -20,
                duration: 0.6,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            });
        });

    }, { scope: container });

    return (
        <section ref={container} className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">Our Journey</h2>

                <div className="max-w-2xl mx-auto relative pl-8 md:pl-0">
                    {/* Center Line (hidden on mobile, visible on desktop could be center, but sticking to left-aligned for simplicity as per MVP) */}
                    {/* Let's do left aligned for simplicity first */}
                    <div className="absolute left-8 md:left-0 top-2 bottom-0 w-px bg-muted md:hidden" />
                    <div ref={lineRef} className="absolute left-8 md:left-0 top-2 w-px bg-primary md:hidden" />

                    {/* Desktop Center Line Layout */}
                    <div className="absolute left-1/2 top-2 bottom-0 w-px bg-muted hidden md:block -translate-x-1/2" />
                    <div ref={lineRef} className="absolute left-1/2 top-2 w-px bg-primary hidden md:block -translate-x-1/2 origin-top" />

                    <div className="space-y-12">
                        {milestones.map((milestone, i) => (
                            <div
                                key={i}
                                ref={(el) => { itemsRef.current[i] = el }}
                                className={cn(
                                    "relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center",
                                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                                )}
                            >
                                {/* Marker */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary z-10 md:-translate-x-1/2 mt-1.5 md:mt-0" />

                                {/* Content Spacer for layout */}
                                <div className="w-full md:w-1/2" />

                                {/* Content Box */}
                                <div className={cn(
                                    "w-full md:w-1/2 pl-12 md:pl-0",
                                    i % 2 === 0 ? "md:pl-12 text-left" : "md:pr-12 md:text-right"
                                )}>
                                    <span className="text-4xl font-bold text-primary/20 block mb-2">{milestone.year}</span>
                                    <h3 className="text-xl font-bold mb-2 font-serif">{milestone.title}</h3>
                                    <p className="text-muted-foreground">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
