"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckCircle2, Star, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Introduction() {
    const container = useRef(null);
    const titleRef = useRef(null);
    const itemsRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            }
        });

        tl.from(titleRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })
            .from((itemsRef.current as any).children, {
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4");

        // Parallax for cards
        gsap.to(itemsRef.current, {
            y: -30,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

    }, { scope: container });

    const features = [
        { icon: ShieldCheck, title: "Advanced Technology", desc: "Digital X-rays, 3D imaging, and laser dentistry." },
        { icon: Heart, title: "Comfort First", desc: "Sedation options and a spa-like atmosphere." },
        { icon: Star, title: "Top Rated Care", desc: "Over 500 5-star reviews from happy patients." },
        { icon: CheckCircle2, title: "Full Service", desc: "From cleanings to full mouth restoration." },
    ];

    return (
        <section ref={container} className="py-12 md:py-24 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2 space-y-6" ref={titleRef}>
                        <span className="text-sm font-bold tracking-widest text-primary uppercase">Welcome to Modern Dentist</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                            Redefining the Dental Experience
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We believe that visiting the dentist should be a positive, empowering experience.
                            Our practice combines state-of-the-art technology with a warm, compassionate approach
                            to ensure your comfort at every visit.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Whether you're here for a routine checkup or a complete smile makeover,
                            we listen to your unique needs and goals.
                        </p>
                        <div className="pt-4">
                            <Button variant="link" className="text-primary text-lg p-0 h-auto font-semibold group">
                                Learn more about us
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </Button>
                        </div>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6" ref={itemsRef}>
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-background p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-serif">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
