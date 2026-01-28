"use client";

import { useRef, useLayoutEffect } from "react"; // Changed useEffect to useLayoutEffect for GSAP context
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smile, Calendar, Users, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: Calendar, value: 15, suffix: "+", label: "Years Experience" },
    { icon: Smile, value: 5000, suffix: "+", label: "Happy Patients" },
    { icon: Award, value: 50, suffix: "", label: "Awards Won" },
    { icon: Users, value: 12, suffix: "", label: "Expert Staff" },
];

export function StatsCounter() {
    const container = useRef(null);
    const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            stats.forEach((stat, i) => {
                const obj = { val: 0 };
                const target = numbersRef.current[i];
                if (!target) return;

                gsap.to(obj, {
                    val: stat.value,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    onUpdate: () => {
                        target.textContent = Math.floor(obj.val) + stat.suffix;
                    }
                });
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-4 border-white/20" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border-4 border-white/20" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="space-y-4">
                            <div className="w-12 h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <div className="space-y-1">
                                <div
                                    ref={(el) => { numbersRef.current[i] = el }}
                                    className="text-4xl md:text-5xl font-bold font-serif min-h-[1.2em]"
                                >
                                    0
                                </div>
                                <div className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
