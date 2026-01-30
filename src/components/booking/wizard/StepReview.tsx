import { services } from "@/data";
import type { BookingFormValues } from "@/lib/validation/bookingSchema";

interface StepReviewProps {
    formData: Partial<BookingFormValues>;
}

export function StepReview({ formData }: StepReviewProps) {
    const selectedService = services.find((s) => s.id === formData.serviceId);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">Review Booking</h2>
            <div className="bg-muted/30 p-6 rounded-lg space-y-4 border border-border">
                <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-bold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-bold">{formData.date?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-bold">{formData.timeSlot}</span>
                </div>
                <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Patient</span>
                    <span className="font-bold">{formData.name}</span>
                </div>
            </div>
            <p className="text-sm text-muted-foreground">
                By clicking &quot;Confirm Booking&quot;, you agree to our cancellation policy.
            </p>
        </div>
    );
}
