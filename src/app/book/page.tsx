import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingForm } from "@/components/booking/booking-form";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function BookingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-muted/30">
            <div className="container mx-auto px-4 py-12 md:py-20 flex-1">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Book Your Appointment</h1>
                        <p className="text-muted-foreground text-lg">
                            Select a service, choose a time, and we'll take care of the rest.
                        </p>
                    </div>

                    <ErrorBoundary name="BookingWizard">
                        <BookingForm />
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}
