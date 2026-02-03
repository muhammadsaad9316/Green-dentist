import { BlogPreview } from "@/components/education/blog-preview";
// Reusing BlogPreview for now as it handles the grid layout perfectly. 
// In a real app, this would be a more extensive grid with pagination.

export default function BlogRate() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-muted/50 py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold mb-4">Dental Health Blog</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Stay informed with the latest tips, news, and insights from our experts.
                    </p>
                </div>
            </section>

            {/* Reusing the component, but we could pass a prop to show 'all' articles or load more */}
            <BlogPreview />
        </div>
    );
}
