# Component Catalog

Complete reference of all components in the Modern Dentist application.

---

## Component Organization

Components are organized by feature/domain for better maintainability:

```
components/
├── booking/      # Booking system (wizard, forms, UI)
├── services/     # Service displays and filters
├── home/         # Homepage-specific sections
├── about/        # About page components
├── testimonials/ # Review system
├── education/    # Educational content
├── contact/      # Contact forms
├── ui/           # Reusable UI components
└── layout/       # App-wide layout components
```

---

## Booking Components

### BookingForm
**Location:** `/components/booking/booking-form.tsx`  
**Purpose:** Main booking entry point (wrapper)  
**Lines:** 7  
**Usage:**
```tsx
import { BookingForm } from "@/components/booking/booking-form";

<BookingForm />
```

---

### BookingWizard
**Location:** `/components/booking/wizard/BookingWizard.tsx`  
**Purpose:** Multi-step booking orchestrator  
**Lines:** 113  
**Props:** None (self-contained)

**Features:**
- 4-step wizard flow
- Form validation with Zod
- State management with React Hook Form
- Success screen on completion

**Usage:**
```tsx
import { BookingWizard } from "@/components/booking/wizard/BookingWizard";

<BookingWizard />
```

---

### StepService
**Location:** `/components/booking/wizard/StepService.tsx`  
**Purpose:** Service selection step  
**Lines:** 30

**Props:**
```typescript
{
  selectedServiceId?: string;
  setValue: UseFormSetValue<BookingFormValues>;
  error?: string;
}
```

---

### StepDateTime
**Location:** `/components/booking/wizard/StepDateTime.tsx`  
**Purpose:** Date and time selection step  
**Lines:** 60

**Props:**
```typescript
{
  selectedDate?: Date;
  selectedTimeSlot?: string;
  setValue: UseFormSetValue<BookingFormValues>;
  errors?: { date?: string; timeSlot?: string };
}
```

---

### StepDetails
**Location:** `/components/booking/wizard/StepDetails.tsx`  
**Purpose:** Patient information form  
**Lines:** 42

**Props:**
```typescript
{
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
}
```

---

### StepReview
**Location:** `/components/booking/wizard/StepReview.tsx`  
**Purpose:** Booking summary review  
**Lines:** 38

**Props:**
```typescript
{
  formData: Partial<BookingFormValues>;
}
```

---

### SuccessScreen
**Location:** `/components/booking/wizard/SuccessScreen.tsx`  
**Purpose:** Booking confirmation screen  
**Lines:** 28

**Props:**
```typescript
{
  formData: Partial<BookingFormValues>;
}
```

---

## Reusable UI Components

### ServiceCard
**Location:** `/components/booking/ui/ServiceCard.tsx`  
**Purpose:** Display individual service with selection  
**Lines:** 31

**Props:**
```typescript
{
  service: Service;
  isSelected: boolean;
  onSelect: (serviceId: string) => void;
}
```

**Usage:**
```tsx
<ServiceCard
  service={service}
  isSelected={selectedId === service.id}
  onSelect={(id) => setSelectedId(id)}
/>
```

---

### TimeSlotButton
**Location:** `/components/booking/ui/TimeSlotButton.tsx`  
**Purpose:** Time slot selection button  
**Lines:** 19

**Props:**
```typescript
{
  time: string;
  isSelected: boolean;
  onSelect: (time: string) => void;
}
```

---

### StepIndicator
**Location:** `/components/booking/ui/StepIndicator.tsx`  
**Purpose:** Multi-step progress indicator  
**Lines:** 63

**Props:**
```typescript
{
  currentStep: number;
}
```

**Features:**
- Mobile-responsive (horizontal on mobile, vertical on desktop)
- Shows completed, active, and upcoming steps
- Visual progress tracking

---

### FormNavigation
**Location:** `/components/booking/ui/FormNavigation.tsx`  
**Purpose:** Back/Next/Submit buttons for forms  
**Lines:** 45

**Props:**
```typescript
{
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}
```

---

## Service Components

### ServiceGrid
**Location:** `/components/services/service-grid.tsx`  
**Purpose:** Display services with category filtering  

**Features:**
- Category-based filtering
- GSAP stagger animations
- Responsive grid layout

---

### BeforeAfterGallery
**Location:** `/components/services/before-after-gallery.tsx`  
**Purpose:** Interactive before/after image slider

**Features:**
- Draggable slider
- Case study selection
- Touch-friendly

---

## Homepage Components

### Hero
**Location:** `/components/home/hero.tsx`  
**Purpose:** Main homepage hero section

**Features:**
- GSAP timeline animations
- Parallax background
- Interactive CTA buttons

---

### ServicesPreview
**Location:** `/components/home/services-preview.tsx`  
**Purpose:** Preview featured services on homepage

---

### Introduction
**Location:** `/components/home/introduction.tsx`  
**Purpose:** Clinic introduction section

---

### StickyAppointmentButton
**Location:** `/components/home/sticky-appointment-button.tsx`  
**Purpose:** Floating appointment CTA

**Features:**
- Appears after scrolling
- Dismissible
- Scroll-based visibility

---

## Layout Components

### Navbar
**Location:** `/components/layout/navbar.tsx`  
**Purpose:** Main navigation header

**Features:**
- Scroll-based styling
- Mobile menu
- Active link highlighting

---

### Footer
**Location:** `/components/layout/footer.tsx`  
**Purpose:** Site footer with links

---

## Component Patterns

### Pattern 1: Decomposed Components

Large features broken into focused pieces following Single Responsibility Principle.

**Example: Booking System**
```
BookingForm (wrapper)
  └─ BookingWizard (orchestrator)
      ├─ StepIndicator (progress UI)
      ├─ Step Components (business logic)
      │   ├─ StepService
      │   ├─ StepDateTime
      │   ├─ StepDetails
      │   └─ StepReview
      ├─ UI Components (presentation)
      │   ├─ ServiceCard
      │   └─ TimeSlotButton
      └─ FormNavigation (controls)
```

**Benefits:**
- Each component < 100 lines
- Easy to test individually
- Can modify steps without breaking others
- Reusable across features

---

### Pattern 2: Data-Driven Components

Components consume centralized data from `/src/data`.

**Example:**
```tsx
import { services } from "@/data";

function ServiceList() {
  return services.map(service => (
    <ServiceCard key={service.id} service={service} />
  ));
}
```

**Benefits:**
- Single source of truth
- No hardcoded data
- Type-safe with TypeScript

---

### Pattern 3: Controlled Components

UI components are controlled by parent (stateless).

**Example:**
```tsx
<ServiceCard
  service={service}
  isSelected={selected === service.id}  // Parent controls state
  onSelect={handleSelect}                // Parent handles logic
/>
```

**Benefits:**
- Predictable behavior
- Easy to test
- Reusable in different contexts

---

## Component Index

| Component | Location | Lines | Purpose |
|-----------|----------|-------|---------|
| **Booking System** |
| BookingForm | /booking/booking-form.tsx | 7 | Wrapper |
| BookingWizard | /booking/wizard/BookingWizard.tsx | 113 | Orchestrator |
| StepService | /booking/wizard/StepService.tsx | 30 | Step 1 |
| StepDateTime | /booking/wizard/StepDateTime.tsx | 60 | Step 2 |
| StepDetails | /booking/wizard/StepDetails.tsx | 42 | Step 3 |
| StepReview | /booking/wizard/StepReview.tsx | 38 | Step 4 |
| SuccessScreen | /booking/wizard/SuccessScreen.tsx | 28 | Confirmation |
| **UI Components** |
| ServiceCard | /booking/ui/ServiceCard.tsx | 31 | Service display |
| TimeSlotButton | /booking/ui/TimeSlotButton.tsx | 19 | Time picker |
| StepIndicator | /booking/ui/StepIndicator.tsx | 63 | Progress bar |
| FormNavigation | /booking/ui/FormNavigation.tsx | 45 | Form controls |
| **Services** |
| ServiceGrid | /services/service-grid.tsx | ~100 | Service listing |
| BeforeAfterGallery | /services/before-after-gallery.tsx | ~80 | Image slider |
| **Home** |
| Hero | /home/hero.tsx | ~120 | Hero section |
| ServicesPreview | /home/services-preview.tsx | ~90 | Services preview |
| Introduction | /home/introduction.tsx | ~85 | Intro section |
| **Layout** |
| Navbar | /layout/navbar.tsx | ~80 | Navigation |
| Footer | /layout/footer.tsx | ~60 | Footer |

---

## Adding New Components

### Step 1: Choose Location
Organize by feature:
- Booking-related → `/components/booking`
- Service-related → `/components/services`
- Reusable UI → `/components/ui`

### Step 2: Follow Patterns
- Keep components < 150 lines
- Use TypeScript interfaces for props
- Extract reusable logic to hooks
- Use centralized data from `/src/data`

### Step 3: Document
- Add to this catalog
- Include props interface
- Provide usage example

---

## Questions?

See [ARCHITECTURE.md](ARCHITECTURE.md) for system overview or [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
