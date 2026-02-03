import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <a
                href="#main-content"
                className="absolute left-[-9999px] top-4 z-[100] bg-background p-4 text-foreground transition-transform focus:left-4 border border-border rounded-md shadow-lg"
            >
                Skip to main content
            </a>
            <SmoothScroll>
                <Navbar />
                <main id="main-content" className="min-h-screen pt-32">
                    {children}
                </main>
                <WhatsAppButton />
                <Footer />
            </SmoothScroll>
        </>
    );
}
