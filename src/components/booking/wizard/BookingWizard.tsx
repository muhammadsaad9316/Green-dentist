"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { bookingFormSchema, type BookingFormValues } from "@/lib/validation/bookingSchema";
import { StepIndicator } from "../ui/StepIndicator";
import { FormNavigation } from "../ui/FormNavigation";
import { StepService } from "./StepService";
import { StepDateTime } from "./StepDateTime";
import { StepDetails } from "./StepDetails";
import { StepReview } from "./StepReview";
import { SuccessScreen } from "./SuccessScreen";

import { submitBooking } from "@/services/bookingService";
import { logger } from "@/lib/logger";
import { useThrottle } from "@/hooks/useThrottle"; // Correctly imported

export function BookingWizard() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            notes: "",
        },
    });

    const formData = watch();

    const nextStep = async () => {
        let isValid = false;
        if (step === 1) isValid = await trigger("serviceId");
        if (step === 2) isValid = await trigger(["date", "timeSlot"]);
        if (step === 3) isValid = await trigger(["name", "email", "phone"]);

        if (isValid) setStep((s) => s + 1);
    };

    const prevStep = () => setStep((s) => s - 1);

    const onSubmit = async (data: BookingFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await submitBooking(data);
            logger.info("Booking confirmed:", result);
            setIsSuccess(true);
        } catch (error) {
            logger.error("Booking failed:", error);
            // TODO: Show error message to user (handled in future phases or via toast)
        } finally {
            setIsSubmitting(false);
        }
    };

    const throttledSubmit = useThrottle(onSubmit, 2000);

    if (isSuccess) {
        return <SuccessScreen formData={formData} />;
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <StepIndicator currentStep={step} />

            <div className="flex-1">
                <div className="bg-background rounded-xl shadow-lg border border-border overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-6 md:p-8 flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {step === 1 && (
                                    <StepService
                                        selectedServiceId={formData.serviceId}
                                        setValue={setValue}
                                        error={errors.serviceId?.message}
                                    />
                                )}
                                {step === 2 && (
                                    <StepDateTime
                                        selectedDate={formData.date}
                                        selectedTimeSlot={formData.timeSlot}
                                        setValue={setValue}
                                        errors={{
                                            date: errors.date?.message,
                                            timeSlot: errors.timeSlot?.message,
                                        }}
                                    />
                                )}
                                {step === 3 && <StepDetails register={register} errors={errors} />}
                                {step === 4 && <StepReview formData={formData} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <FormNavigation
                        currentStep={step}
                        totalSteps={4}
                        isSubmitting={isSubmitting}
                        onBack={prevStep}
                        onNext={nextStep}
                        onSubmit={handleSubmit(throttledSubmit)}
                    />
                </div>
            </div>
        </div>
    );
}
