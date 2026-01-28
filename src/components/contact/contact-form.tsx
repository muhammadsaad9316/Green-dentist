"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";

import { logger } from "@/lib/logger";
import { useThrottle } from "@/hooks/useThrottle";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .max(15, "Phone number is too long")
        .optional()
        .or(z.literal("")),
    subject: z.string().min(5, "Subject is too short"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        logger.info("Contact Form Submitted:", data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
    };

    const throttledSubmit = useThrottle(onSubmit, 2000);

    return (
        <Card className="h-fit shadow-lg border-border/60">
            <CardHeader>
                <CardTitle className="font-serif text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                    We usually respond within 24 hours. For emergencies, please call us directly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isSuccess ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                            <Send size={16} />
                        </div>
                        <div>
                            <p className="font-bold">Message Sent!</p>
                            <p className="text-sm">We'll get back to you shortly.</p>
                            <Button variant="link" className="p-0 h-auto text-green-700 mt-2" onClick={() => setIsSuccess(false)}>
                                Send another message
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(throttledSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input {...register("name")} placeholder="John Doe" />
                            {errors.name && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div >

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input {...register("email")} placeholder="john@example.com" />
                                {errors.email && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Phone (Optional)</Label>
                                <Input {...register("phone")} placeholder="(555) 123-4567" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Subject</Label>
                            <Input {...register("subject")} placeholder="Inquiry about..." />
                            {errors.subject && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.subject.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea {...register("message")} className="min-h-[150px]" placeholder="How can we help you?" />
                            {errors.message && <p role="alert" aria-live="polite" className="text-red-500 text-sm">{errors.message.message}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin mr-2" size={18} /> : "Send Message"}
                        </Button>
                    </form >
                )}
            </CardContent >
        </Card >
    );
}
