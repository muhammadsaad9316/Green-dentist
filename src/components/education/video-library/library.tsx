"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { images } from "@/lib/images";
// import { Dialog, DialogContent } from "@/components/ui/dialog"; // Removed unused import// I previously removed Dialog due to import errors. I'll create a simple custom modal or implement Dialog primitives.
// Let's create a CUSTOM video modal to be safe and fast.

const videos = [
    {
        id: 1,
        title: "How Dental Implants Work",
        category: "Procedures",
        thumbnail: images.procedures.checkup,
        duration: "2:15"
    },
    {
        id: 2,
        title: "Correct Brushing Technique",
        category: "Hygiene",
        thumbnail: images.hero,
        duration: "1:45"
    },
    {
        id: 3,
        title: "Patient Success Story: Sarah",
        category: "Testimonials",
        thumbnail: images.procedures.whitening,
        duration: "3:30"
    },
    {
        id: 4,
        title: "First Visit Tour",
        category: "Office",
        thumbnail: images.office.waitingRoom,
        duration: "4:00"
    }
];

const categories = ["All", "Procedures", "Hygiene", "Testimonials", "Office"];

export function VideoLibrary() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

    const filteredVideos = activeCategory === "All"
        ? videos
        : videos.filter(v => v.category === activeCategory);

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">

                {/* Filters */}
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVideos.map((video) => (
                        <div
                            key={video.id}
                            className="group cursor-pointer"
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm bg-muted mb-3">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all font-light" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                {video.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{video.category}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal (Mock) */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        {/* Fake Video Player */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white text-lg">Video Player Placeholder: {selectedVideo.title}</p>
                            {/* In real app, embed YouTube or Vimeo player here */}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
