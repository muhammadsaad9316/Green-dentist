"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingProgressIndicator() {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Only show on booking page for demo purposes, or could be global
        if (window.location.pathname.includes("/book")) {
            setShow(true);
        } else {
            setShow(false);
        }

        // In a real app, this would listen to form state context
        // For now, we'll just mock it or leave it as a static indicator of where they are in general flow

    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
            <div className="bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg px-6 py-3 flex items-center gap-4">
                <span className="text-sm font-semibold">Booking Progress</span>
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className={`w-2 h-2 rounded-full ${step === 1 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
