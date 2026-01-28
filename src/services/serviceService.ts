import { services as allServices } from "@/data";
import type { Service, ServiceCategory } from "@/types";

/**
 * Get all services
 */
export function getServices(): Service[] {
    return allServices;
}

/**
 * Get service by ID
 */
export function getServiceById(id: string): Service | undefined {
    return allServices.find((service) => service.id === id);
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: string | ServiceCategory): Service[] {
    if (category === "All") return allServices;
    return allServices.filter((service) => service.category === category);
}

/**
 * Search services by query (name, description)
 */
export function searchServices(query: string): Service[] {
    const lowerQuery = query.toLowerCase();
    return allServices.filter(
        (service) =>
            service.name.toLowerCase().includes(lowerQuery) ||
            service.description?.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get featured services
 */
export function getFeaturedServices(limit?: number): Service[] {
    // Could add a "featured" flag to services in the future
    const featured = allServices.slice(0, limit);
    return featured;
}
