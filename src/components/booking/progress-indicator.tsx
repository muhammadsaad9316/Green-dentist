"use client";

import { usePathname } from "next/navigation";

export function FloatingProgressIndicator() {
    const pathname = usePathname();
    const show = pathname?.includes("/book");

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
