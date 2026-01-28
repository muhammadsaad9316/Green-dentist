import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmergencySection() {
    return (
        <section className="bg-destructive text-destructive-foreground py-16">
            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 animate-pulse">
                    <AlertTriangle size={32} />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">Having a Dental Emergency?</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                    If you are experiencing severe pain, bleeding, or trauma, do not wait.
                    We offer same-day emergency appointments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="font-bold text-destructive hover:bg-white/90">
                        Call (555) 123-4567 Now
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
                        View Emergency Guide
                    </Button>
                </div>
            </div>
        </section>
    );
}
