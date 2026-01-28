import { CheckCircle2, Calendar as CalendarIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    { id: 1, name: "Service", icon: CheckCircle2 },
    { id: 2, name: "Date & Time", icon: CalendarIcon },
    { id: 3, name: "Details", icon: User },
    { id: 4, name: "Review", icon: CheckCircle2 },
];

interface StepIndicatorProps {
    currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border sticky top-24">
                <h3 className="font-serif font-bold text-lg mb-6 hidden md:block">Your Progress</h3>
                <div className="flex md:flex-col justify-between md:gap-6 relative">
                    {/* Mobile Progress Bar Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -z-10 md:hidden -translate-y-1/2" />

                    {steps.map((s) => {
                        const isActive = currentStep === s.id;
                        const isCompleted = currentStep > s.id;

                        return (
                            <div key={s.id} className="flex items-center gap-3 relative">
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10",
                                        isActive
                                            ? "bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20"
                                            : isCompleted
                                                ? "bg-green-500 text-white"
                                                : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {isCompleted ? <CheckCircle2 size={16} /> : s.id}
                                </div>
                                <span
                                    className={cn(
                                        "text-sm font-medium hidden md:block transition-colors",
                                        isActive
                                            ? "text-primary font-bold"
                                            : isCompleted
                                                ? "text-foreground"
                                                : "text-muted-foreground"
                                    )}
                                >
                                    {s.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
