import { services } from "@/data";
import { ServiceCard } from "../ui/ServiceCard";
import type { UseFormSetValue } from "react-hook-form";
import type { BookingFormValues } from "@/lib/validation/bookingSchema";

interface StepServiceProps {
    selectedServiceId?: string;
    setValue: UseFormSetValue<BookingFormValues>;
    error?: string;
}

export function StepService({ selectedServiceId, setValue, error }: StepServiceProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold">Select a Service</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={selectedServiceId === service.id}
                        onSelect={(id) => setValue("serviceId", id)}
                    />
                ))}
            </div>
            {error && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
