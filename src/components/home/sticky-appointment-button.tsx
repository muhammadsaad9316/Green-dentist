"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function StickyAppointmentButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after 30% of viewport height (or just 300px for quicker testing)
            const threshold = window.innerHeight * 0.3;
            setIsVisible(window.scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isDismissed) {
            const timer = setTimeout(() => setIsDismissed(false), 10000); // Return after 10s
            return () => clearTimeout(timer);
        }
    }, [isDismissed]);

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-28 right-8 z-40 hidden md:flex items-center gap-2"
                >
                    <Button
                        size="lg"
                        className="rounded-full shadow-2xl h-14 px-8 text-lg gap-2 animate-pulse-slow ring-2 ring-white/20"
                        onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        <Calendar className="w-5 h-5" />
                        Book Online
                    </Button>
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground p-1 rounded-full shadow-sm backdrop-blur-sm transition-colors"
                        aria-label="Dismiss"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
