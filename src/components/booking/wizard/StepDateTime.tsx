"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logger } from "@/lib/logger";
import { Calendar } from "@/components/ui/calendar";
import { TimeSlotButton } from "../ui/TimeSlotButton";
import { TimeSlotSkeleton } from "../ui/TimeSlotSkeleton";
import { getAvailableSlots, groupSlotsByPeriod, type SlotAvailability } from "@/services/availabilityService";
import type { UseFormSetValue } from "react-hook-form";
import type { BookingFormValues } from "@/lib/validation/bookingSchema";
import { Sun, Moon, CalendarDays } from "lucide-react";

interface StepDateTimeProps {
    selectedDate?: Date;
    selectedTimeSlot?: string;
    setValue: UseFormSetValue<BookingFormValues>;
    errors?: {
        date?: string;
        timeSlot?: string;
    };
}

export function StepDateTime({
    selectedDate,
    selectedTimeSlot,
    setValue,
    errors,
}: StepDateTimeProps) {
    const [slots, setSlots] = useState<SlotAvailability[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    // Fetch slots when date changes
    const fetchSlots = useCallback(async (date: Date) => {
        setIsLoading(true);
        // Clear previous slot selection when date changes
        setValue("timeSlot", undefined as unknown as string);

        try {
            const availableSlots = await getAvailableSlots(date);
            setSlots(availableSlots);
            setHasLoadedOnce(true);
        } catch (error) {
            logger.error("Failed to fetch slots:", error);
            setSlots([]);
        } finally {
            setIsLoading(false);
        }
    }, [setValue]);

    useEffect(() => {
        if (selectedDate) {
            fetchSlots(selectedDate);
        }
    }, [selectedDate, fetchSlots]);

    const groupedSlots = groupSlotsByPeriod(slots);
    const hasSlots = slots.length > 0;
    const availableSlots = slots.filter(s => s.available);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">Choose Date & Time</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Calendar Section */}
                <div className="flex-shrink-0">
                    <div className="bg-card rounded-xl p-2 border border-border shadow-sm">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => setValue("date", date as Date)}
                            disabled={(date) => date < new Date() || date.getDay() === 0}
                            className="rounded-lg"
                        />
                    </div>
                    {errors?.date && (
                        <p role="alert" className="text-destructive text-sm mt-2">
                            Please select a date.
                        </p>
                    )}
                </div>

                {/* Time Slots Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarDays size={18} className="text-muted-foreground" />
                        <h4 className="font-semibold">
                            {selectedDate
                                ? `Available on ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`
                                : "Select a date to see available times"
                            }
                        </h4>
                    </div>

                    {!selectedDate && !hasLoadedOnce && (
                        <div className="text-center py-12 text-muted-foreground">
                            <CalendarDays size={48} className="mx-auto mb-4 opacity-30" />
                            <p>Pick a date from the calendar to view available time slots.</p>
                        </div>
                    )}

                    {isLoading && (
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                                    <Sun size={14} /> Morning
                                </p>
                                <TimeSlotSkeleton count={4} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                                    <Moon size={14} /> Afternoon
                                </p>
                                <TimeSlotSkeleton count={4} />
                            </div>
                        </div>
                    )}

                    {!isLoading && selectedDate && !hasSlots && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl">
                            <p className="font-medium">No appointments available on this day.</p>
                            <p className="text-sm mt-1">Please try a different date.</p>
                        </div>
                    )}

                    {!isLoading && hasSlots && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDate?.toISOString()}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {/* Morning Slots */}
                                {groupedSlots.morning.length > 0 && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                                            <Sun size={14} className="text-amber-500" /> Morning
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {groupedSlots.morning.map((slot, idx) => (
                                                <motion.div
                                                    key={slot.time}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.03 }}
                                                >
                                                    <TimeSlotButton
                                                        time={slot.time}
                                                        isSelected={selectedTimeSlot === slot.time}
                                                        isDisabled={!slot.available}
                                                        onSelect={(time) => setValue("timeSlot", time)}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Afternoon Slots */}
                                {groupedSlots.afternoon.length > 0 && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                                            <Moon size={14} className="text-indigo-400" /> Afternoon
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {groupedSlots.afternoon.map((slot, idx) => (
                                                <motion.div
                                                    key={slot.time}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: (groupedSlots.morning.length + idx) * 0.03 }}
                                                >
                                                    <TimeSlotButton
                                                        time={slot.time}
                                                        isSelected={selectedTimeSlot === slot.time}
                                                        isDisabled={!slot.available}
                                                        onSelect={(time) => setValue("timeSlot", time)}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {availableSlots.length > 0 && (
                                    <p className="text-xs text-muted-foreground text-center">
                                        {availableSlots.length} time slot{availableSlots.length !== 1 ? 's' : ''} available
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {errors?.timeSlot && selectedDate && (
                        <p role="alert" className="text-destructive text-sm mt-4">
                            Please select a time slot.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
