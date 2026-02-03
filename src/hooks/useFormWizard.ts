import { useState } from "react";

interface UseFormWizardOptions {
    initialStep?: number;
    totalSteps: number;
    onStepChange?: (step: number) => void;
}

export function useFormWizard({
    initialStep = 1,
    totalSteps,
    onStepChange,
}: UseFormWizardOptions) {
    const [currentStep, setCurrentStep] = useState(initialStep);

    const nextStep = () => {
        if (currentStep < totalSteps) {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            onStepChange?.(newStep);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            onStepChange?.(newStep);
        }
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step);
            onStepChange?.(step);
        }
    };

    const reset = () => {
        setCurrentStep(initialStep);
        onStepChange?.(initialStep);
    };

    return {
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
        reset,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
        progress: (currentStep / totalSteps) * 100,
    };
}
