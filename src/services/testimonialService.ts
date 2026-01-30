import { apiClient } from "@/lib/apiClient";


// We'll define the interface here matching the form schema for now,
// or we could import the schema type if we export it from the component/validation file.
// Ideally, we move the schema to /lib/validation/testimonialSchema.ts, but to avoid circular deps for now:

export interface TestimonialData {
    name: string;
    email: string;
    rating: number;
    review: string;
}

export interface TestimonialResponse {
    success: boolean;
    message?: string;
    id?: string;
}

/**
 * Submit a new testimonial review
 */
export async function submitReview(data: TestimonialData): Promise<TestimonialResponse> {
    try {
        const response = await apiClient.post<TestimonialResponse>("/testimonials", data);
        return response.data;
    } catch (error) {
        // The apiClient interceptor handles logging, but we might want to re-throw or return a failure object
        // depending on how the UI handles it. For now, re-throwing ensures the component catches usage errors.
        throw error;
    }
}
