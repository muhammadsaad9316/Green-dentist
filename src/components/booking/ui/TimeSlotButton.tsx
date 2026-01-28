import { Button } from "@/components/ui/button";
import { Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlotButtonProps {
    time: string;
    isSelected: boolean;
    isDisabled?: boolean;
    onSelect: (time: string) => void;
}

export function TimeSlotButton({ time, isSelected, isDisabled, onSelect }: TimeSlotButtonProps) {
    return (
        <Button
            variant={isSelected ? "default" : "outline"}
            disabled={isDisabled}
            onClick={() => onSelect(time)}
            className={cn(
                "h-8 px-2.5 justify-between group transition-all duration-200",
                "hover:shadow-md",
                isSelected && "ring-2 ring-primary/20 shadow-md",
                isDisabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <span className="flex items-center gap-1.5 text-xs">
                <Clock size={12} className="text-muted-foreground group-hover:text-current transition-colors shrink-0" />
                <span className="whitespace-nowrap">{time}</span>
            </span>
            {isSelected && (
                <Check size={14} className="text-primary-foreground shrink-0 ml-1" />
            )}
        </Button>
    );
}
