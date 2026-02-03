import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onSelect: (serviceId: string) => void;
}

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
    return (
        <div
            onClick={() => onSelect(service.id)}
            className={cn(
                "p-4 rounded-lg border cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all",
                isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{service.name}</h3>
                <span className="text-sm font-medium text-primary">{service.price}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
                <Clock size={12} className="mr-1" /> {service.duration}
            </div>
        </div>
    );
}
