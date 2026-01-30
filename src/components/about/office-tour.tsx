"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";

import { images as imgReg } from "@/lib/images";

// Mock Images
const images = [
    { src: imgReg.office.main, alt: "Reception Area", caption: "Our welcoming reception area designed for your comfort." },
    { src: imgReg.office.sterilization, alt: "Treatment Room 1", caption: "State-of-the-art treatment suites." },
    { src: imgReg.office.waitingRoom, alt: "Technology", caption: "Advanced 3D imaging center." },
    { src: imgReg.office.exterior, alt: "Consultation Room", caption: "Private consultation rooms." },
    { src: imgReg.office.sterilization, alt: "Sterilization", caption: "Hospital-grade sterilization center." },
    { src: imgReg.office.main, alt: "Recovery Suite", caption: "Peaceful recovery area." },
];

export function OfficeTour() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    // Note: Since I haven't implemented shadcn/ui Dialog component yet, I will create a simple custom modal here 
    // or I should create the Dialog primitive first.
    // To keep it simple and dependency-free for this step, I'll build a custom modal overlay.

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold mb-4">Tour Our Facility</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Designed to feel more like a spa than a clinic. Explore our modern, relaxing spaces.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`View larger image of ${img.alt}`}
                            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            onClick={() => setSelectedImage(index)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedImage(index);
                                }
                            }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                                <div className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground">
                                    <Expand size={20} />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-medium">{img.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Modal */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="relative w-full max-w-5xl aspect-video mx-4 rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedImage].src}
                            alt={images[selectedImage].alt}
                            fill
                            className="object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <h3 className="text-white text-xl font-bold">{images[selectedImage].alt}</h3>
                            <p className="text-white/80">{images[selectedImage].caption}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
