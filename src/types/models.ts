import type { LucideIcon } from "lucide-react";

/**
 * Represents a dental service offered by the clinic
 */
export interface Service {
    id: string;
    name: string;
    title?: string; // Display title (may differ from name)
    description: string;
    category: ServiceCategory;
    duration: string; // e.g., "60 min"
    price: string; // e.g., "$150" or "Free"
    icon: LucideIcon;
    slug: string; // URL-friendly identifier
}

export type ServiceCategory =
    | "General"
    | "Cosmetic"
    | "Restorative"
    | "Orthodontics"
    | "Emergency";

/**
 * Represents a bookable time slot
 */
export type TimeSlot = string; // e.g., "09:00 AM"

/**
 * Before/after comparison case for gallery
 */
export interface GalleryCase {
    id: number;
    title: string;
    category: string;
    before: string; // Image path
    after: string; // Image path
}
