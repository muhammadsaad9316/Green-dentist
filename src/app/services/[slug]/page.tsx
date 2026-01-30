import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Clock, DollarSign } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
// import { notFound } from "next/navigation";

interface ServiceData {
    title: string;
    category: string;
    description: string;
    image: StaticImageData | string;
    benefits: string[];
    procedure: { step: number; title: string; desc: string }[];
    faq: { q: string; a: string }[];
}

// Mock Data Source - In a real app this would likely come from getStaticProps/getStaticPaths or a CMS
const servicesData: Record<string, ServiceData> = {
    "routine-checkups": {
        title: "Routine Checkups & Cleaning",
        category: "General Dentistry",
        description: "Preventative care is the foundation of a healthy smile. Our comprehensive exams track your oral health over time.",
        image: images.procedures.checkup,
        benefits: [
            "Early detection of cavities and gum disease",
            "Professional tartar removal",
            "Oral cancer screening included",
            "Personalized hygiene advice"
        ],
        procedure: [
            { step: 1, title: "Initial Exam", desc: "Digital X-rays and visual inspection by Dr. Mitchell." },
            { step: 2, title: "Plaque Removal", desc: "Ultrasonic scaling to remove stubborn tartar." },
            { step: 3, title: "Polishing", desc: "Gentle polishing to remove surface stains." },
            { step: 4, title: "Fluoride Treatment", desc: "Optional protection for enamel strength." }
        ],
        faq: [
            { q: "How often should I visit?", a: "We recommend every 6 months for most patients." },
            { q: "Does cleaning hurt?", a: "Our hygienists use gentle techniques. Numbing gel is available if you have sensitive gums." }
        ]
    },
    "teeth-whitening": {
        title: "Professional Teeth Whitening",
        category: "Cosmetic Dentistry",
        description: "Achieve a brilliant smile up to 8 shades whiter in just one hour.",
        image: images.procedures.whitening,
        benefits: ["Immediate results", "Safe for enamel", "Custom trays for maintenance", "Boosts confidence"],
        procedure: [
            { step: 1, title: "Color Match", desc: "We record your current shade and discuss your goals." },
            { step: 2, title: "Protection", desc: "Gums are carefully covered to prevent irritation." },
            { step: 3, title: "Application", desc: "Professional-strength gel is applied and activated by light." },
            { step: 4, title: "Reveal", desc: "Rinse and admire your new smile!" }
        ],
        faq: [
            { q: "How long does it last?", a: "With proper care, results can last 1-3 years." },
            { q: "Will it make my teeth sensitive?", a: "Some temporary sensitivity is normal but subsides quickly." }
        ]
    }
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = servicesData[slug];

    if (!service) {
        // In a real app we might show a generic service page or fallback
        // For now, let's just show the formatting of the first service if not found to demonstrate layout, or 404
        // return notFound(); 
        // Fallback for demo purposes if slug doesn't match mock data
        return (
            <div className="flex flex-col min-h-screen">
                <div className="container py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
                    <p className="mb-8">The service you are looking for does not exist in our demo data.</p>
                    <Link href="/services"><Button>Back to Services</Button></Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="relative z-10 text-center text-white p-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <Link href="/services" className="inline-flex items-center text-sm hover:underline mb-4 opacity-80 hover:opacity-100 transition-opacity">
                        <ArrowLeft size={16} className="mr-2" /> Back to Services
                    </Link>
                    <div className="text-sm font-bold tracking-widest uppercase mb-2 bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-md">
                        {service.category}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{service.title}</h1>
                    <p className="text-xl max-w-2xl mx-auto text-white/90">{service.description}</p>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6 py-20">
                <div className="grid md:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Benefits */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-6">Why Choose This Treatment?</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.benefits.map((benefit: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Procedure Steps */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-6">What to Expect</h2>
                            <div className="space-y-6 relative border-l-2 border-muted pl-8 ml-3">
                                {service.procedure.map((step, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[43px] w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary text-sm">
                                            {step.step}
                                        </div>
                                        <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQs */}
                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-6">Common Questions</h2>
                            <div className="space-y-4">
                                {service.faq.map((item, i) => (
                                    <div key={i} className="border border-border rounded-lg p-6">
                                        <h4 className="font-bold mb-2 text-lg">{item.q}</h4>
                                        <p className="text-muted-foreground">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl sticky top-24">
                            <h3 className="text-2xl font-serif font-bold mb-2">Ready to Book?</h3>
                            <p className="text-primary-foreground/80 mb-6">Schedule your consultation today and take the first step towards a healthier smile.</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 opacity-70" />
                                    <span className="font-medium">Approx. Duration: 60 mins</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 opacity-70" />
                                    <span className="font-medium">Insurance Accepted</span>
                                </div>
                            </div>

                            <Button variant="secondary" size="lg" className="w-full font-bold text-primary">
                                Book Appointment
                            </Button>
                            <p className="text-xs text-center mt-4 opacity-60">No payment required to book.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
