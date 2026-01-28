"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Need to create Badge or remove
import { images } from "@/lib/images";
import { Github, Linkedin, Twitter } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const team = [
    {
        name: "Dr. Sarah Mitchell",
        role: "Lead Dentist & Founder",
        image: images.people.doctorWoman,
        specialty: "Cosmetic Dentistry",
        bio: "With over 15 years of experience, Dr. Mitchell combines artistry with medical expertise to create stunning smiles.",
    },
    {
        name: "Dr. James Chen",
        role: "Orthodontist",
        image: images.people.doctorMan,
        specialty: "Invisalign Specialist",
        bio: "Dr. Chen loves helping patients achieve confidence through perfectly aligned smiles using modern technology.",
    },
    {
        name: "Dr. Emily Rodriguez",
        role: "Pediatric Specialist",
        image: images.people.womanSmile,
        specialty: "Pediatric Dentistry",
        bio: "Creating a fun, safe environment for children to learn about oral health is Dr. Rodriguez's passion.",
    },
];

export function TeamIntro() {
    const container = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        gsap.from(cardsRef.current, {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Meet Our Team</h2>
                    <p className="text-muted-foreground text-lg">
                        Experienced professionals passionate about your dental health and comfort.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div key={index} ref={(el) => { cardsRef.current[index] = el }}>
                            <Card className="overflow-hidden border-none shadow-none bg-transparent group">
                                <CardHeader className="p-0 mb-6 relative overflow-hidden rounded-2xl w-full aspect-[4/5]">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Overlay with socials */}
                                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <Twitter className="w-6 h-6 hover:text-secondary cursor-pointer" />
                                        <Linkedin className="w-6 h-6 hover:text-secondary cursor-pointer" />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 text-center space-y-2">
                                    <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                                        {member.specialty}
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold">{member.name}</h3>
                                    <p className="font-medium text-primary">{member.role}</p>
                                    <p className="text-muted-foreground pt-2 text-sm leading-relaxed max-w-xs mx-auto">
                                        {member.bio}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
