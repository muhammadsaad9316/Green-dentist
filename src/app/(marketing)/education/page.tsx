import { ProcedureExplainer } from "@/components/education/procedure-explainer";
import { BlogPreview } from "@/components/education/blog-preview";
import Link from "next/link";


export default function EducationPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-muted/50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                        Patient Resources
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Dental Health Hub</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Empower yourself with knowledge. Learn about procedures, hygiene tips,
                        and how to maintain a healthy smile for life.
                    </p>
                </div>
            </section>

            <ProcedureExplainer />
            <BlogPreview />

            <section className="py-20 bg-primary text-primary-foreground text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold mb-6">Have more questions?</h2>
                    <p className="max-w-xl mx-auto mb-8 text-primary-foreground/80">
                        Our team is always happy to explain your treatment options in detail during your visit.
                    </p>
                    <Link
                        href="/book"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md h-12 px-8 text-base"
                    >
                        Ask a Dentist
                    </Link>
                </div>
            </section>
        </div>
    );
}
