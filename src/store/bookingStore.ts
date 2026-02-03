import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { BookingFormValues } from "@/lib/validation/bookingSchema";
import type { BookingResponse } from "@/api/types/bookings";
import { submitBooking as submitBookingService } from "@/services/bookingService";

interface BookingState {
    // Current booking draft
    currentBooking: Partial<BookingFormValues> | null;

    // Confirmed bookings
    bookings: BookingResponse[];

    // Loading states
    isSubmitting: boolean;
    isLoading: boolean;

    // Error state
    error: string | null;

    // Actions
    setCurrentBooking: (booking: Partial<BookingFormValues>) => void;
    clearCurrentBooking: () => void;
    addBooking: (booking: BookingResponse) => void;
    setBookings: (bookings: BookingResponse[]) => void;
    setSubmitting: (isSubmitting: boolean) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    submitBooking: (booking: BookingFormValues) => Promise<boolean>;
}

export const useBookingStore = create<BookingState>()(
    devtools(
        persist(
            (set) => ({
                // Initial state
                currentBooking: null,
                bookings: [],
                isSubmitting: false,
                isLoading: false,
                error: null,

                // Actions
                setCurrentBooking: (booking) => set({ currentBooking: booking }),
                clearCurrentBooking: () => set({ currentBooking: null }),
                addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
                setBookings: (bookings) => set({ bookings }),
                setSubmitting: (isSubmitting) => set({ isSubmitting }),
                setLoading: (isLoading) => set({ isLoading }),
                setError: (error) => set({ error }),
                submitBooking: async (bookingData) => {
                    set({ isSubmitting: true, error: null });
                    try {
                        const result = await submitBookingService(bookingData);
                        set({ isSubmitting: false });
                        return result.success;
                    } catch (error) {
                        const message = error instanceof Error ? error.message : "Failed to submit booking";
                        set({ isSubmitting: false, error: message });
                        return false;
                    }
                },
            }),
            {
                name: "booking-storage", // localStorage key
                partialize: (state) => ({
                    // Only persist these fields
                    currentBooking: state.currentBooking,
                    bookings: state.bookings,
                }),
            }
        ),
        { name: "BookingStore" } // DevTools name
    )
);
