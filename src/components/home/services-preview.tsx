"use client";

import { useRef } from "react";
import { ArrowRight, Sparkles, Activity, ShieldPlus, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

import { AnimatedIcon } from "@/components/ui/animated-icon";
import servicePlaceholder from "@/assets/animations/service-placeholder.json";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "General Dentistry",
        description: "Comprehensive care for your long-term oral health, including cleanings, fillings, and exams.",
        icon: ShieldPlus,
        color: "bg-blue-500/10 text-blue-500",
        animationData: servicePlaceholder, // Example usage
    },
    {
        title: "Cosmetic Design",
        description: "Transform your smile with veneers, whitening, and aesthetic bonding tailored to you.",
        icon: Sparkles,
        color: "bg-purple-500/10 text-purple-500",
        animationData: servicePlaceholder,
    },
    {
        title: "Restorative Care",
        description: "Repair and restore damaged teeth with crowns, bridges, and advanced implant technology.",
        icon: Activity,
        color: "bg-amber-500/10 text-amber-500",
        animationData: servicePlaceholder,
    },
    {
        title: "Orthodontics",
        description: "Straighten your smile discreetly with Invisalign and modern alignment solutions.",
        icon: Stethoscope,
        color: "bg-teal-500/10 text-teal-500",
        animationData: servicePlaceholder,
    },
];

export function ServicesPreview() {
    const container = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Staggered entry animation only on desktop
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                    end: "bottom center",
                    toggleActions: "play none none reverse",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-12 md:py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="text-sm font-bold tracking-widest text-primary uppercase">Our Expertise</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                        World-Class Dental Services
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We offer a full spectrum of dental treatments under one roof,
                        delivered with precision and care.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el }}
                        >
                            <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer overflow-hidden relative">
                                <CardHeader>
                                    <motion.div
                                        className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-4`}
                                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        {service.animationData ? (
                                            <div className="w-8 h-8">
                                                <AnimatedIcon
                                                    animationData={service.animationData}
                                                    className="w-full h-full"
                                                    loop={true}
                                                    autoplay={true}
                                                />
                                            </div>
                                        ) : (
                                            <service.icon size={28} />
                                        )}
                                    </motion.div>
                                    <CardTitle className="group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                    <div className="flex items-center text-sm font-medium text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                                    </div>
                                </CardContent>
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
                        View All Services
                    </Button>
                </div>
            </div>
        </section>
    );
}
