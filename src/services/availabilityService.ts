import type { TimeSlot } from "@/types";

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
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

    const dayOfWeek = date.getDay();

    // Sunday - no slots
    if (dayOfWeek === 0) {
        return [];
    }

    // Saturday - limited slots
    if (dayOfWeek === 6) {
        return SATURDAY_SLOTS.map((time) => ({
            time,
            available: true,
        }));
    }

    // Weekdays - simulate some slots being unavailable based on date
    const dateHash = date.getDate() % 5;
    return ALL_SLOTS.map((time, index) => ({
        time,
        // Pseudo-random availability based on date to make it realistic
        available: (index + dateHash) % 4 !== 0,
    }));
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
