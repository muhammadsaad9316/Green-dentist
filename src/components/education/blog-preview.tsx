import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

const articles = [
    {
        id: 1,
        title: "10 Tips for a Cavity-Free Life",
        excerpt: "Daily habits that can significantly reduce your risk of tooth decay and gum disease.",
        category: "Hygiene",
        date: "Oct 12, 2025",
        author: "Dr. Sarah Mitchell",
        image: images.procedures.checkup,
        slug: "tips-cavity-free"
    },
    {
        id: 2,
        title: "Understanding Dental Anxiety",
        excerpt: "How we help patients overcome fear and create a comfortable dental experience.",
        category: "Wellness",
        date: "Sep 28, 2025",
        author: "Dr. Emily Rodriguez",
        image: images.office.main,
        slug: "dental-anxiety"
    },
    {
        id: 3,
        title: "Invisalign vs. Braces: Which is Right for You?",
        excerpt: "A comprehensive comparison of the two most popular orthodontic treatments.",
        category: "Orthodontics",
        date: "Sep 15, 2025",
        author: "Dr. James Chen",
        image: images.procedures.whitening,
        slug: "invisalign-vs-braces"
    }
];

export function BlogPreview() {
    return (
        <section className="py-24 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-4">Latest from the Blog</h2>
                        <p className="text-muted-foreground">Expert advice and clinic news.</p>
                    </div>
                    <Link href="/education/blog" className="text-primary font-semibold hover:underline flex items-center">
                        View All Articles <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link key={article.id} href={`/education/blog/${article.slug}`} className="group">
                            <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-background">
                                <CardHeader className="p-0 relative aspect-video overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-md hover:bg-background">
                                        {article.category}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                        <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 mt-auto">
                                    <span className="text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors flex items-center">
                                        Read Article <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
