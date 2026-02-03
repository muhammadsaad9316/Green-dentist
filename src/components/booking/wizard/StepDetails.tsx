import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { BookingFormValues } from "@/lib/validation/bookingSchema";

interface StepDetailsProps {
    register: UseFormRegister<BookingFormValues>;
    errors: FieldErrors<BookingFormValues>;
}

export function StepDetails({ register, errors }: StepDetailsProps) {
    return (
        <div className="space-y-6 max-w-md">
            <h2 className="text-2xl font-serif font-bold">Your Information</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input {...register("name")} placeholder="John Doe" />
                    {errors.name && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.name.message}</p>}
                </div >
                <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input {...register("email")} placeholder="john@example.com" />
                    {errors.email && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input {...register("phone")} placeholder="(555) 123-4567" />
                    {errors.phone && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Notes (Optional)</Label>
                    <Input {...register("notes")} placeholder="Any specific concerns?" />
                </div>
            </div >
        </div >
    );
}
