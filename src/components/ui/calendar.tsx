"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-4", className)}
            classNames={{
                // Container structure
                months: "relative flex flex-col sm:flex-row gap-4",
                month: "w-full",
                month_caption: "flex justify-center items-center h-10 relative mb-2",
                caption_label: "text-base font-semibold",

                // Navigation
                nav: "absolute inset-x-0 flex justify-between items-center px-1",
                button_previous: cn(
                    "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100",
                    "flex items-center justify-center rounded-lg border border-input",
                    "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                    "transition-all duration-200 absolute left-0"
                ),
                button_next: cn(
                    "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100",
                    "flex items-center justify-center rounded-lg border border-input",
                    "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                    "transition-all duration-200 absolute right-0"
                ),

                // Week grid
                month_grid: "w-full border-collapse",
                weekdays: "flex w-full",
                weekday: "text-muted-foreground w-10 h-10 font-medium text-[0.8rem] flex items-center justify-center",
                week: "flex w-full",

                // Day cells
                day: cn(
                    "h-10 w-10 p-0 text-center text-sm relative",
                    "flex items-center justify-center"
                ),
                day_button: cn(
                    "h-9 w-9 p-0 font-normal rounded-lg",
                    "flex items-center justify-center",
                    "hover:bg-primary/10 hover:text-primary",
                    "transition-all duration-200 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                ),

                // Day states
                today: "bg-accent text-accent-foreground font-bold ring-1 ring-primary/30 rounded-lg",
                selected: cn(
                    "bg-primary text-primary-foreground rounded-lg shadow-md",
                    "hover:bg-primary hover:text-primary-foreground",
                    "focus:bg-primary focus:text-primary-foreground"
                ),
                outside: "text-muted-foreground opacity-50",
                disabled: "text-muted-foreground opacity-40 cursor-not-allowed hover:bg-transparent",
                hidden: "invisible",
                range_start: "rounded-l-lg",
                range_end: "rounded-r-lg",
                range_middle: "bg-accent text-accent-foreground",

                ...classNames,
            }}
            components={{
                Chevron: ({ orientation }: { orientation?: "left" | "right" | "up" | "down" }) => {
                    if (orientation === "left") {
                        return <ChevronLeft className="h-4 w-4" />
                    }
                    return <ChevronRight className="h-4 w-4" />
                }
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
