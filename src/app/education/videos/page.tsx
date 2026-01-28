import { VideoLibrary } from "@/components/education/video-library/library";

export default function VideoLibraryPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-muted/50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold mb-4">Video Library</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Watch and learn about our procedures, patient testimonials, and oral hygiene guides.
                    </p>
                </div>
            </section>

            <VideoLibrary />
        </div>
    );
}
