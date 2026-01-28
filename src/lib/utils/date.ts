import { format as formatDate } from "date-fns";

/**
 * Format a date as "January 23rd, 2026"
 */
export function formatLongDate(date: Date): string {
    return formatDate(date, "MMMM do, yyyy");
}

/**
 * Format a date as "Jan 23, 2026"
 */
export function formatShortDate(date: Date): string {
    return formatDate(date, "MMM d, yyyy");
}

/**
 * Format a date as "01/23/2026"
 */
export function formatNumericDate(date: Date): string {
    return formatDate(date, "MM/dd/yyyy");
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date): boolean {
    return date < new Date();
}

/**
 * Check if a date is a weekend (Saturday or Sunday)
 */
export function isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
}
