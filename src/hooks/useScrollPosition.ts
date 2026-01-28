import { useState, useEffect } from "react";

interface UseScrollPositionOptions {
    threshold?: number;
    onScrollPast?: () => void;
}

export function useScrollPosition({
    threshold = 0,
    onScrollPast,
}: UseScrollPositionOptions = {}) {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolledPast, setIsScrolledPast] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            const scrolledPast = currentScrollY > threshold;
            if (scrolledPast && !isScrolledPast) {
                setIsScrolledPast(true);
                onScrollPast?.();
            } else if (!scrolledPast && isScrolledPast) {
                setIsScrolledPast(false);
            }
        };

        handleScroll(); // Initial check
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold, onScrollPast, isScrolledPast]);

    return {
        scrollY,
        isScrolledPast,
        scrollProgress:
            (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    };
}
