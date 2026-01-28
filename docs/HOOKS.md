# Custom Hooks Reference

Complete reference for all custom hooks in the Modern Dentist application.

---

## State Management Hooks

### useBookingStore

Manage global booking state with Zustand.

**Import:**
```typescript
import { useBookingStore } from "@/store";
```

**Usage:**
```typescript
const {
  currentBooking,
  setCurrentBooking,
  bookings,
  addBooking,
  isSubmitting,
  setSubmitting,
  error,
  setError,
} = useBookingStore();
```

**State:**
- `currentBooking: Partial<BookingFormValues> | null` - Draft booking
- `bookings: BookingResponse[]` - Confirmed bookings
- `isSubmitting: boolean` - Submission state
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message

**Actions:**
- `setCurrentBooking(booking)` - Update draft
- `clearCurrentBooking()` - Reset draft
- `addBooking(booking)` - Add confirmed booking
- `setBookings(bookings)` - Set bookings list
- `setSubmitting(bool)` - Set submission state
- `setLoading(bool)` - Set loading state
- `setError(error)` - Set error message

**Features:**
- ✅ Persists to localStorage
- ✅ DevTools integration
- ✅ Type-safe

**Example:**
```typescript
function BookingWizard() {
  const { setSubmitting, setError, addBooking } = useBookingStore();
  
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const booking = await bookingsApi.create(toBookingRequest(data));
      addBooking(booking);
    } catch (error) {
      setError(handleApiError(error).message);
    } finally {
      setSubmitting(false);
    }
  };
}
```

---

### useUIStore

Manage global UI state (theme, modals, etc.).

**Import:**
```typescript
import { useUIStore } from "@/store";
```

**State:**
- `theme: "light" | "dark" | "system"` - Theme preference
- `activeModal: string | null` - Current modal ID
- `isSidebarOpen: boolean` - Sidebar state
- `animationsEnabled: boolean` - Animation toggle

**Actions:**
- `setTheme(theme)` - Set theme
- `openModal(modalId)` - Open modal
- `closeModal()` - Close modal
- `toggleSidebar()` - Toggle sidebar
- `toggleAnimations()` - Toggle animations

**Example:**
```typescript
function ThemeToggle() {
  const { theme, setTheme } = useUIStore();
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
```

---

## Form Hooks

### useFormWizard

Multi-step form navigation and progress tracking.

**Import:**
```typescript
import { useFormWizard } from "@/hooks";
```

**Options:**
```typescript
{
  initialStep?: number;        // Starting step (default: 1)
  totalSteps: number;          // Total number of steps
  onStepChange?: (step) => void; // Callback on step change
}
```

**Returns:**
```typescript
{
  currentStep: number;         // Current step (1-indexed)
  totalSteps: number;          // Total steps
  nextStep: () => void;        // Go to next step
  prevStep: () => void;        // Go to previous step
  goToStep: (step) => void;    // Jump to specific step
  reset: () => void;           // Reset to initialStep
  isFirstStep: boolean;        // Is on first step
  isLastStep: boolean;         // Is on last step
  progress: number;            // Progress percentage (0-100)
}
```

**Example:**
```typescript
function MultiStepForm() {
  const wizard = useFormWizard({ totalSteps: 4 });
  
  return (
    <>
      <ProgressBar progress={wizard.progress} />
      
      {wizard.currentStep === 1 && <Step1 />}
      {wizard.currentStep === 2 && <Step2 />}
      {wizard.currentStep === 3 && <Step3 />}
      {wizard.currentStep === 4 && <Step4 />}
      
      <button onClick={wizard.prevStep} disabled={wizard.isFirstStep}>
        Back
      </button>
      <button onClick={wizard.nextStep} disabled={wizard.isLastStep}>
        Next
      </button>
    </>
  );
}
```

---

### useFormSubmission

Handle form submission state and errors.

**Import:**
```typescript
import { useFormSubmission } from "@/hooks";
```

**Options:**
```typescript
{
  onSubmit: (data: any) => Promise<void>;  // Async submit function
  onSuccess?: () => void;                   // Success callback
}
```

**Returns:**
```typescript
{
  isSubmitting: boolean;      // Submission in progress
  isSuccess: boolean;         // Submission succeeded
  error: string | null;       // Error message
  handleSubmit: (data) => Promise<void>;  // Submit handler
  reset: () => void;          // Reset all state
}
```

**Example:**
```typescript
function ContactForm() {
  const { isSubmitting, isSuccess, error, handleSubmit } = useFormSubmission({
    onSubmit: async (data) => {
      await api.submitContact(data);
    },
    onSuccess: () => {
      alert("Message sent!");
    }
  });
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}>
      {/* form fields */}
      <button disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
      {error && <p className="error">{error}</p>}
      {isSuccess && <p className="success">Sent!</p>}
    </form>
  );
}
```

---

## Utility Hooks

### useScrollPosition

Track scroll position and detect thresholds.

**Import:**
```typescript
import { useScrollPosition } from "@/hooks";
```

**Options:**
```typescript
{
  threshold?: number;         // Scroll threshold in pixels
  onScrollPast?: () => void;  // Callback when scrolled past threshold
}
```

**Returns:**
```typescript
{
  scrollY: number;            // Current scroll position
  isScrolledPast: boolean;    // Scrolled past threshold
  scrollProgress: number;     // Scroll progress (0-100)
}
```

**Example:**
```typescript
function Navbar() {
  const { isScrolledPast } = useScrollPosition({ threshold: 50 });
  
  return (
    <nav className={isScrolledPast ? "bg-white shadow" : "bg-transparent"}>
      {/* nav content */}
    </nav>
  );
}
```

---

### useCategoryFilter

Generic category-based filtering for any data type.

**Import:**
```typescript
import { useCategoryFilter } from "@/hooks";
```

**Options:**
```typescript
{
  items: T[];                              // Items to filter
  getCategory: (item: T) => string;        // Get category from item
  initialCategory?: string;                // Starting category (default: "All")
}
```

**Returns:**
```typescript
{
  activeCategory: string;                  // Currently selected category
  setActiveCategory: (category) => void;   // Set active category
  categories: string[];                    // All available categories
  filteredItems: T[];                      // Filtered items
}
```

**Example:**
```typescript
function ServiceGrid() {
  const { activeCategory, setActiveCategory, categories, filteredItems } = 
    useCategoryFilter({
      items: services,
      getCategory: (service) => service.category,
    });
  
  return (
    <>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={activeCategory === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
      
      {filteredItems.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
}
```

---

### useMediaQuery

Responsive breakpoint detection.

**Import:**
```typescript
import { useMediaQuery, useIsMobile, useIsDesktop } from "@/hooks";
```

**Usage:**
```typescript
// Custom query
const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");

// Presets
const isMobile = useIsMobile();      // max-width: 768px
const isDesktop = useIsDesktop();    // min-width: 1025px
```

**Example:**
```typescript
function ResponsiveComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? "mobile-layout" : "desktop-layout"}>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
```

---

## Animation Hooks

### useScrollAnimation

GSAP scroll-triggered animations.

**Import:**
```typescript
import { useScrollAnimation } from "@/hooks";
```

**Parameters:**
```typescript
animation: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline
options?: {
  trigger?: string | HTMLElement;  // ScrollTrigger element
  start?: string;                  // Start position (default: "top 80%")
  end?: string;                    // End position
  scrub?: boolean;                 // Scrub animation
  markers?: boolean;               // Debug markers
  onEnter?: () => void;           // Enter callback
  onLeave?: () => void;           // Leave callback
}
```

**Returns:**
```typescript
elementRef: RefObject<HTMLElement>  // Ref to attach to element
```

**Example:**
```typescript
function AnimatedSection() {
  const ref = useScrollAnimation(
    (el) => gsap.from(el, { opacity: 0, y: 50, duration: 1 }),
    { start: "top 80%" }
  );
  
  return <section ref={ref}>Animated content</section>;
}
```

---

### useFadeIn

Automatic fade-in animation on mount.

**Import:**
```typescript
import { useFadeIn } from "@/hooks";
```

**Options:**
```typescript
{
  delay?: number;              // Delay before animation
  duration?: number;           // Animation duration
  onComplete?: () => void;     // Completion callback
}
```

**Example:**
```typescript
function Modal() {
  const ref = useFadeIn({ delay: 0.2, duration: 0.5 });
  
  return <div ref={ref} className="modal">Modal content</div>;
}
```

---

### useStagger

Stagger animation for child elements.

**Import:**
```typescript
import { useStagger } from "@/hooks";
```

**Parameters:**
```typescript
selector: string              // CSS selector for children
options?: {
  staggerAmount?: number;     // Stagger delay
  delay?: number;             // Initial delay
  duration?: number;          // Animation duration
}
```

**Example:**
```typescript
function CardGrid() {
  const ref = useStagger(".card", { staggerAmount: 0.1 });
  
  return (
    <div ref={ref} className="grid">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

---

## Hooks Index

| Hook | Purpose | Returns |
|------|---------|---------|
| `useBookingStore` | Global booking state | State + actions |
| `useUIStore` | Global UI state | State + actions |
| `useFormWizard` | Multi-step navigation | Step management |
| `useFormSubmission` | Form submission state | Submit handler + state |
| `useScrollPosition` | Scroll tracking | Position + threshold |
| `useCategoryFilter` | Category filtering | Filtered items |
| `useMediaQuery` | Breakpoint detection | Boolean |
| `useScrollAnimation` | Scroll animations | Element ref |
| `useFadeIn` | Fade-in animation | Element ref |
| `useStagger` | Stagger children | Container ref |

---

## Creating New Hooks

### Guidelines

1. **Single Responsibility** - One hook, one purpose
2. **Reusable** - Can be used in multiple components
3. **Type-Safe** - Full TypeScript support
4. **Documented** - Add to this reference

### Template

```typescript
import { useState, useEffect } from "react";

interface UseMyHookOptions {
  option1?: string;
  option2?: number;
}

export function useMyHook(options: UseMyHookOptions = {}) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return {
    state,
    setState,
    // ... other returns
  };
}
```

---

## Questions?

See [ARCHITECTURE.md](ARCHITECTURE.md) or [CONTRIBUTING.md](CONTRIBUTING.md).
