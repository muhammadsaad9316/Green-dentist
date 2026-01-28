import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceGrid } from "@/components/services/service-grid";
import { BeforeAfterGallery } from "@/components/services/before-after-gallery";

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-muted/50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Services</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Comprehensive dental care tailored to your unique needs.
                    </p>
                </div>
            </section>

            <ServiceGrid />
            <BeforeAfterGallery />
        </div>
    );
}
