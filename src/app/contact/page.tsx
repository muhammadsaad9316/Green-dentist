import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { EmergencySection } from "@/components/contact/emergency-section";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-muted/50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We're here to answer your questions and help you achieve your best smile.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-16">
                    <ContactInfo />
                    <ErrorBoundary name="ContactForm">
                        <ContactForm />
                    </ErrorBoundary>
                </div>
            </div>

            <EmergencySection />
        </div>
    );
}
