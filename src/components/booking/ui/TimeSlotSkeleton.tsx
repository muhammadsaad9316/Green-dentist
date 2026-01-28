import { cn } from "@/lib/utils";

interface TimeSlotSkeletonProps {
    count?: number;
}

export function TimeSlotSkeleton({ count = 6 }: TimeSlotSkeletonProps) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "h-11 rounded-lg bg-muted/50 animate-pulse",
                        // Stagger animation delay for wave effect
                        i % 2 === 0 ? "animation-delay-100" : "animation-delay-200"
                    )}
                />
            ))}
        </div>
    );
}
