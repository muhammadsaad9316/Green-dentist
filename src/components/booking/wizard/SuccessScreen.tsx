import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import type { BookingFormValues } from "@/lib/validation/bookingSchema";

interface SuccessScreenProps {
    formData: Partial<BookingFormValues>;
}

export function SuccessScreen({ formData }: SuccessScreenProps) {
    return (
        <Card className="max-w-md mx-auto text-center p-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
            </div>
            <CardTitle className="text-2xl mb-2">Booking Confirmed!</CardTitle>
            <CardDescription className="text-lg">
                Thanks {formData.name}, your appointment is set for{" "}
                {formData.date ? format(formData.date, "MMMM do") : ""} at {formData.timeSlot}.
            </CardDescription>
            <p className="text-muted-foreground mt-4 text-sm">
                We've sent a confirmation email to {formData.email}.
            </p>
            <div className="mt-8">
                <Button onClick={() => (window.location.href = "/")}>Return Home</Button>
            </div>
        </Card>
    );
}
