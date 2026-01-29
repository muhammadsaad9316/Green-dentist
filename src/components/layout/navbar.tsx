"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-4 left-0 right-0 z-50 transition-all duration-300 mx-auto max-w-[95%] md:max-w-7xl rounded-full border",
                scrolled
                    ? "bg-background/70 backdrop-blur-xl border-border/40 shadow-lg py-3"
                    : "bg-background/30 backdrop-blur-md border-transparent py-4 shadow-sm"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 z-50">
                        <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-primary">
                            Modern<span className="text-foreground">Dentist</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium hover:text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                        <Link href="/book">
                            <Button size="default" className="ml-4">Book Appointment</Button>
                        </Link>
                    </nav>

                    {/* Mobile Nav Toggle */}
                    <button
                        className="md:hidden z-50 p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div
                        className={cn(
                            "fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden overflow-y-auto py-8",
                            isOpen ? "translate-x-0" : "translate-x-full"
                        )}
                        style={{ top: "0", height: "100dvh" }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-serif font-medium hover:text-primary transition-colors shrink-0"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/book" onClick={() => setIsOpen(false)} className="shrink-0">
                            <Button size="lg" className="mt-4 w-40">
                                Book Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
