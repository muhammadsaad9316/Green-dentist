import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TeamIntro } from "@/components/about/team-intro";
import { PracticeTimeline } from "@/components/about/timeline";
import { StatsCounter } from "@/components/about/stats-counter";
import { OfficeTour } from "@/components/about/office-tour";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Page Header */}
            <section className="bg-muted/50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Our Practice</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Get to know the team dedicated to your smile, our history, and our modern facility.
                    </p>
                </div>
            </section>

            <TeamIntro />
            <StatsCounter />
            <PracticeTimeline />
            <OfficeTour />
        </div>
    );
}
