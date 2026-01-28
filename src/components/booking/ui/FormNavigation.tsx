import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormNavigationProps {
    currentStep: number;
    totalSteps: number;
    isSubmitting: boolean;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

export function FormNavigation({
    currentStep,
    totalSteps,
    isSubmitting,
    onBack,
    onNext,
    onSubmit,
}: FormNavigationProps) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="p-6 bg-muted/20 border-t border-border flex justify-between items-center">
            <Button
                variant="ghost"
                onClick={onBack}
                disabled={isFirstStep || isSubmitting}
                className={cn(isFirstStep && "invisible")}
            >
                <ChevronLeft size={16} className="mr-2" /> Back
            </Button>

            {isLastStep ? (
                <Button onClick={onSubmit} disabled={isSubmitting} className="min-w-[140px]">
                    {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : "Confirm Booking"}
                </Button>
            ) : (
                <Button onClick={onNext}>
                    Next Step <ChevronRight size={16} className="ml-2" />
                </Button>
            )}
        </div>
    );
}
