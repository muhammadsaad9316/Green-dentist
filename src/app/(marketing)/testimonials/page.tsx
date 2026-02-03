
import { ReviewCarousel } from "@/components/testimonials/review-carousel";
import { ReviewForm } from "../../components/testimonials/review-form";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function TestimonialsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-muted/50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Patient Stories</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Read what our community has to say about their experience with us.
                    </p>
                </div>
            </section>

            <ErrorBoundary name="ReviewCarousel">
                <ReviewCarousel />
            </ErrorBoundary>

            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-serif font-bold mb-8 text-center">Share Your Experience</h2>
                    <ErrorBoundary name="ReviewForm">
                        <ReviewForm />
                    </ErrorBoundary>
                </div>
            </section>
        </div>
    );
}
