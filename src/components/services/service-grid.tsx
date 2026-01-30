"use client";

import { useState, useRef } from "react";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getServicesByCategory } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "General", "Cosmetic", "Restorative", "Orthodontics", "Emergency"];

export function ServiceGrid() {
    const [activeCategory, setActiveCategory] = useState("All");
    const container = useRef(null);

    const filteredServices = getServicesByCategory(activeCategory);

    useGSAP(() => {
        // Simple fade in for grid items when filtered
        gsap.from(".service-card", {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
        });
    }, { scope: container, dependencies: [activeCategory] });

    return (
        <section ref={container} className="py-20">
            <div className="container mx-auto px-4 md:px-6">

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === cat ? "default" : "outline"}
                            onClick={() => setActiveCategory(cat)}
                            className="rounded-full"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <Link key={service.id} href={`/services/${service.slug}`} className="service-card block h-full">
                            <Card className="h-full hover:shadow-lg transition-shadow border-border/60 hover:border-primary/50 group">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <service.icon size={24} />
                                        </div>
                                        <Badge variant="secondary">{service.category}</Badge>
                                    </div>
                                    <CardTitle className="group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{service.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-sm font-semibold text-primary flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                        Learn More <ArrowRight size={16} />
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
