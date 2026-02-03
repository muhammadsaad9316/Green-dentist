import { useState, useMemo } from "react";

interface UseCategoryFilterOptions<T> {
    items: T[];
    getCategory: (item: T) => string;
    initialCategory?: string;
}

export function useCategoryFilter<T>({
    items,
    getCategory,
    initialCategory = "All",
}: UseCategoryFilterOptions<T>) {
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(items.map(getCategory));
        return ["All", ...Array.from(uniqueCategories)];
    }, [items, getCategory]);

    const filteredItems = useMemo(() => {
        if (activeCategory === "All") return items;
        return items.filter((item) => getCategory(item) === activeCategory);
    }, [items, activeCategory, getCategory]);

    return {
        activeCategory,
        setActiveCategory,
        categories,
        filteredItems,
    };
}
