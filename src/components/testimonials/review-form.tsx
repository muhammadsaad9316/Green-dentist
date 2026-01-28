"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { logger } from "@/lib/logger";
import { useThrottle } from "@/hooks/useThrottle";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    rating: z.number().min(1, "Please select a rating").max(5),
    review: z.string().min(10, "Review must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ReviewForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { rating: 5 }
    });

    const currentRating = watch("rating");

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API
        logger.info("Review Submitted:", data);
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const throttledSubmit = useThrottle(onSubmit, 2000);

    if (isSuccess) {
        return (
            <Card className="text-center p-8 bg-background border-green-100">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">Your review has been submitted efficiently.</p>
                <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>Submit Another</Button>
            </Card>
        );
    }

    return (
        <Card className="bg-background">
            <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit(throttledSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input {...register("name")} placeholder="Your Name" />
                            {errors.name && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div >
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input {...register("email")} placeholder="you@example.com" />
                            {errors.email && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                    </div >

                    <div className="space-y-2">
                        <Label>Your Rating</Label>
                        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setValue("rating", star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={28}
                                        fill={(hoverRating || currentRating) >= star ? "gold" : "transparent"}
                                        className={(hoverRating || currentRating) >= star ? "text-yellow-400" : "text-muted-foreground/30"}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors.rating && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.rating.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Your Experience</Label>
                        <Textarea
                            {...register("review")}
                            placeholder="Tell us about your visit..."
                            className="min-h-[120px]"
                        />
                        {errors.review && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.review.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Submit Review"}
                    </Button>
                </form >
            </CardContent >
        </Card >
    );
}
