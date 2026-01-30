import { useState } from "react";

interface UseFormSubmissionOptions<T> {
    onSubmit: (data: T) => Promise<void>;
    onSuccess?: () => void;
}

export function useFormSubmission<T>({ onSubmit, onSuccess }: UseFormSubmissionOptions<T>) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: T) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit(data);
            setIsSuccess(true);
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setIsSubmitting(false);
        setIsSuccess(false);
        setError(null);
    };

    return {
        isSubmitting,
        isSuccess,
        error,
        handleSubmit,
        reset,
    };
}
