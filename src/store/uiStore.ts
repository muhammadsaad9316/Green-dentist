import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UIState {
    // Theme
    theme: "light" | "dark" | "system";

    // Modals
    activeModal: string | null;

    // Sidebar
    isSidebarOpen: boolean;

    // Animations
    animationsEnabled: boolean;

    // Actions
    setTheme: (theme: "light" | "dark" | "system") => void;
    openModal: (modalId: string) => void;
    closeModal: () => void;
    toggleSidebar: () => void;
    toggleAnimations: () => void;
}

export const useUIStore = create<UIState>()(
    devtools(
        persist(
            (set) => ({
                // Initial state
                theme: "system",
                activeModal: null,
                isSidebarOpen: false,
                animationsEnabled: true,

                // Actions
                setTheme: (theme) => set({ theme }),
                openModal: (modalId) => set({ activeModal: modalId }),
                closeModal: () => set({ activeModal: null }),
                toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
                toggleAnimations: () =>
                    set((state) => ({ animationsEnabled: !state.animationsEnabled })),
            }),
            {
                name: "ui-storage",
            }
        ),
        { name: "UIStore" }
    )
);
