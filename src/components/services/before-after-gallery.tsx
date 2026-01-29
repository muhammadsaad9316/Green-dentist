"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { galleryCases } from "@/data";

export function BeforeAfterGallery() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [activeCase, setActiveCase] = useState(galleryCases[0]);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    return (
        <section className="py-12 md:py-24 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Transformations</h2>
                    <p className="text-muted-foreground">See the real results we achieve for our patients.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Comparison Viewer */}
                    <div
                        className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none"
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                    >
                        {/* After Image (Background) */}
                        <Image
                            src={activeCase.after}
                            alt={`${activeCase.title} After`}
                            fill
                            sizes="(max-width: 896px) 100vw, 896px"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">AFTER</div>

                        {/* Before Image (Clipped) */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${sliderPosition}%` }}
                        >
                            <Image
                                src={activeCase.before}
                                alt={`${activeCase.title} Before`}
                                fill
                                sizes="(max-width: 896px) 100vw, 896px"
                                className="object-cover object-left"
                                // Important: object-left ensures the image stays anchored as we resize the container width
                                priority
                            />
                            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">BEFORE</div>
                        </div>

                        {/* Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute"><path d="m9 18 6-6-6-6" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Controls / Thumbnails would go here */}
                    <div className="flex justify-center gap-4 mt-8">
                        {galleryCases.map((c) => (
                            <Button
                                key={c.id}
                                variant={activeCase.id === c.id ? "default" : "outline"}
                                onClick={() => { setActiveCase(c); setSliderPosition(50); }}
                            >
                                {c.title}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
