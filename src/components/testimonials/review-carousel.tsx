"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/images";

import { useGSAP } from "@gsap/react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reviews = [
    {
        id: 1,
        name: "Emily Thompson",
        role: "Patient since 2018",
        rating: 5,
        text: "The absolute best dental experience I've ever had. Dr. Mitchell is so gentle and explains everything thoroughly.",
        image: images.people.womanSmile,
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Invisalign Patient",
        rating: 5,
        text: "My smile transformation was incredible. The team made the whole Invisalign process smooth and easy.",
        image: images.people.manSmile,
    },
    {
        id: 3,
        name: "Sarah Johnson",
        role: "Mother of 2",
        rating: 5,
        text: "My kids actually look forward to going to the dentist now! The pediatric wing is amazing.",
        image: images.people.childSmile,
    },
    {
        id: 4,
        name: "David Wilson",
        role: "Emergency Patient",
        rating: 5,
        text: "They got me in same-day for a broken tooth. I was in so much pain and they fixed it immediately.",
        image: images.people.doctorWoman,
    },
    {
        id: 5,
        name: "Jessica Lee",
        role: "Whitening Patient",
        rating: 5,
        text: "I can't believe how white my teeth are after just one session. Highly recommend!",
        image: images.people.doctorMan,
    }
];


export function ReviewCarousel() {
    const container = useRef(null);
    const scroller = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(() => {
        if (prefersReducedMotion) return;

        // Simple infinite horizontal scroll animation
        const anim = gsap.to(scroller.current, {
            x: "-50%",
            duration: 40,
            ease: "none",
            repeat: -1,
        });

        ScrollTrigger.create({
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => anim.play(),
            onLeave: () => anim.pause(),
            onEnterBack: () => anim.play(),
            onLeaveBack: () => anim.pause(),
        });
    }, { scope: container, dependencies: [prefersReducedMotion] });

    return (
        <section ref={container} className="py-24 overflow-hidden bg-background">
            <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
                <h2 className="text-3xl font-serif font-bold">What Our Patients Say</h2>
            </div>

            <div className="w-full overflow-hidden">
                <div ref={scroller} className="flex gap-6 w-[200%] pl-4">
                    {/* Render reviews twice for seamless loop */}
                    {[...reviews, ...reviews].map((review, i) => (
                        <Card key={`${review.id}-${i}`} className="flex-shrink-0 w-[350px] md:w-[450px] border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-8 flex flex-col h-full bg-background relative overflow-hidden group">
                                <Quote className="absolute top-6 right-6 text-primary/10 w-16 h-16 group-hover:text-primary/20 transition-colors" />

                                <div className="flex gap-1 mb-6 text-yellow-400">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                                </div>

                                <p className="text-lg leading-relaxed mb-8 flex-1 relative z-10">&quot;{review.text}&quot;</p>


                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={review.image}
                                            alt={review.name}
                                            fill
                                            className="object-cover"
                                            onLoad={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                img.style.opacity = '1';
                                            }}
                                            style={{ opacity: 0, transition: 'opacity 0.3s' }}
                                        />
                                        <Skeleton className="absolute inset-0 z-[-1]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{review.name}</h4>
                                        <p className="text-sm text-muted-foreground">{review.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
