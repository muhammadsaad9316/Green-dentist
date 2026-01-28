import {
    ShieldPlus,
    Sparkles,
    Activity,
    Stethoscope,
    Brush,
    HeartPulse,
} from "lucide-react";
import type { Service } from "@/types";

/**
 * All dental services offered by the clinic
 * Single source of truth for service data
 */
export const services: Service[] = [
    {
        id: "checkup",
        name: "Routine Checkup",
        title: "Routine Checkups",
        description: "Comprehensive exams and deep cleaning for lasting oral health.",
        category: "General",
        duration: "60 min",
        price: "$150",
        icon: ShieldPlus,
        slug: "routine-checkups",
    },
    {
        id: "whitening",
        name: "Teeth Whitening",
        title: "Teeth Whitening",
        description:
            "Professional whitening treatments for a brighter, more confident smile.",
        category: "Cosmetic",
        duration: "90 min",
        price: "$350",
        icon: Sparkles,
        slug: "teeth-whitening",
    },
    {
        id: "consult",
        name: "New Patient Consultation",
        title: "New Patient Consultation",
        description:
            "Comprehensive first visit to understand your dental health and goals.",
        category: "General",
        duration: "45 min",
        price: "Free",
        icon: Stethoscope,
        slug: "new-patient-consultation",
    },
    {
        id: "implants",
        name: "Dental Implants",
        title: "Dental Implants",
        description: "Permanent, natural-looking replacements for missing teeth.",
        category: "Restorative",
        duration: "2-3 hours",
        price: "$2,500+",
        icon: Activity,
        slug: "dental-implants",
    },
    {
        id: "invisalign",
        name: "Invisalign",
        title: "Invisalign",
        description:
            "Clear aligners to straighten your teeth discreetly and comfortably.",
        category: "Orthodontics",
        duration: "12-18 months",
        price: "$3,500+",
        icon: Stethoscope,
        slug: "invisalign",
    },
    {
        id: "fillings",
        name: "Composite Fillings",
        title: "Composite Fillings",
        description: "Tooth-colored fillings to repair cavities naturally.",
        category: "General",
        duration: "30-60 min",
        price: "$200+",
        icon: Brush,
        slug: "composite-fillings",
    },
    {
        id: "emergency",
        name: "Emergency Visit",
        title: "Emergency Care",
        description:
            "Immediate attention for toothaches, trauma, and urgent issues.",
        category: "Emergency",
        duration: "30 min",
        price: "varies",
        icon: HeartPulse,
        slug: "emergency-care",
    },
];

/**
 * Get service by ID
 */
export function getServiceById(id: string): Service | undefined {
    return services.find((service) => service.id === id);
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: string): Service[] {
    if (category === "All") return services;
    return services.filter((service) => service.category === category);
}
