import type { TimeSlot } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { logger } from "@/lib/logger";

export interface SlotAvailability {
    time: TimeSlot;
    available: boolean;
}

// Simulated delay to mimic API call
const SIMULATED_DELAY_MS = 400;

// Full slot list
const ALL_SLOTS: TimeSlot[] = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
];

// Saturday has fewer slots
const SATURDAY_SLOTS: TimeSlot[] = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
];

/**
 * Fetches available time slots for a given date.
 * Currently uses mock data with simulated delay.
 * Replace this implementation with actual API call when backend is ready.
 */
export async function getAvailableSlots(date: Date): Promise<SlotAvailability[]> {
    const dayOfWeek = date.getDay();

    // Sunday - no slots
    if (dayOfWeek === 0) {
        return [];
    }

    // Select base slots based on day
    const baseSlots = dayOfWeek === 6 ? SATURDAY_SLOTS : ALL_SLOTS;

    try {
        // Fetch booked slots from API
        const response = await apiClient.get<{ bookedSlots: string[] }>("/bookings/availability", {
            params: {
                date: date.toISOString()
            }
        });

        const bookedSlots = new Set(response.data.bookedSlots);

        return baseSlots.map((time) => ({
            time,
            available: !bookedSlots.has(time),
        }));

    } catch (error) {
        logger.error("Failed to fetch slots from API:", error);
        // Fallback to empty if API fails to prevent double bookings
        return [];
    }
}

/**
 * Groups slots into morning and afternoon periods
 */
export function groupSlotsByPeriod(slots: SlotAvailability[]): {
    morning: SlotAvailability[];
    afternoon: SlotAvailability[];
} {
    return {
        morning: slots.filter((s) => s.time.includes("AM")),
        afternoon: slots.filter((s) => s.time.includes("PM")),
    };
}
