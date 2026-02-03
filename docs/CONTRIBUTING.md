# Contributing Guide

Thank you for considering contributing to Modern Dentist! This guide will help you get started.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/modern-dentist.git
cd modern-dentist
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:3000`

---

## Project Structure

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture.

**Key directories:**
- `src/app/` - Next.js pages
- `src/components/` - React components
- `src/hooks/` - Custom hooks
- `src/store/` - State management
- `src/api/` - API layer
- `src/data/` - Static data
- `docs/` - Documentation

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

**Branch naming:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring

### 2. Make Changes

Follow our [Coding Standards](#coding-standards).

### 3. Test Your Changes

```bash
# Type check
npx tsc --noEmit

# Build test
npm run build

# Run locally
npm run dev
```

### 4. Commit Changes

Follow our [Commit Guidelines](#commit-guidelines).

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

See [Pull Request Process](#pull-request-process).

---

## Coding Standards

### TypeScript

✅ **DO:**
- Use TypeScript for all new code
- Define interfaces for props
- Avoid `any` type
- Use strict mode

❌ **DON'T:**
- Use `any` unless absolutely necessary
- Ignore TypeScript errors
- Use `@ts-ignore` without explanation

**Example:**
```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Bad
function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

---

### Components

✅ **DO:**
- Keep components < 150 lines
- One component per file
- Use functional components
- Extract reusable logic to hooks

❌ **DON'T:**
- Create giant monolithic components
- Mix business logic with UI
- Duplicate code

**Example:**
```typescript
// ✅ Good
function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <div onClick={() => onSelect(service.id)}>
      <h3>{service.name}</h3>
      <p>{service.price}</p>
    </div>
  );
}

// ❌ Bad
function ServiceCard({ service, onSelect }: any) {
  // 200 lines of mixed logic and UI
}
```

---

### Hooks

✅ **DO:**
- Extract reusable logic to custom hooks
- Follow `use*` naming convention
- Document hook parameters and returns

**Example:**
```typescript
// ✅ Good
function useFormWizard({ totalSteps }: UseFormWizardOptions) {
  const [step, setStep] = useState(1);
  
  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  
  return { step, nextStep };
}
```

---

### Styling

✅ **DO:**
- Use Tailwind CSS utility classes
- Follow existing design patterns
- Use `cn()` utility for conditional classes

**Example:**
```typescript
import { cn } from "@/lib/utils";

<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-primary text-white"
)}>
  Click me
</button>
```

---

### File Organization

✅ **DO:**
- Organize by feature, not type
- Keep related files together
- Use index files for exports

**Example:**
```
components/
  booking/
    wizard/
      BookingWizard.tsx
      StepService.tsx
      StepDateTime.tsx
    ui/
      ServiceCard.tsx
      TimeSlotButton.tsx
```

---

## Commit Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, missing semi-colons, etc.
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

### Examples

```bash
feat(booking): add email confirmation step

Added email confirmation to booking wizard.
Users now receive a confirmation email after booking.

Closes #123
```

```bash
fix(navbar): fix mobile menu not closing

Mobile menu was staying open after navigation.
Added click handler to close menu on route change.
```

```bash
docs(api): document booking endpoints

Added comprehensive API documentation for all
booking-related endpoints.
```

---

## Pull Request Process

### 1. Update Documentation

If you:
- **Add new component** → Update `docs/COMPONENTS.md`
- **Add new hook** → Update `docs/HOOKS.md`
- **Add API endpoint** → Update `docs/API.md`
- **Change architecture** → Update `docs/ARCHITECTURE.md`

### 2. Run Checks

```bash
# Type check
npx tsc --noEmit

# Build
npm run build
```

### 3. Create PR

**Title format:**
```
[Type] Brief description
```

**Examples:**
- `[Feature] Add email notifications`
- `[Fix] Resolve mobile menu bug`
- `[Docs] Update API documentation`

**Description template:**
```markdown
## What
Brief description of changes

## Why
Reason for changes

## How
Implementation details

## Testing
How you tested the changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Type check passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] No console errors
```

### 4. Review Process

- Maintainers will review your PR
- Address feedback if requested
- Once approved, it will be merged

---

## Adding New Features

### Adding a New Page

1. Create page in `/src/app/[route]/page.tsx`
2. Use existing components where possible
3. Add navigation links
4. Update documentation

### Adding a New Component

1. Determine feature category
2. Create in `/src/components/[feature]/ComponentName.tsx`
3. Add to `docs/COMPONENTS.md`
4. Export from index if needed

### Adding a New Hook

1. Create in `/src/hooks/useHookName.ts`
2. Add to `docs/HOOKS.md`
3. Export from `/src/hooks/index.ts`
4. Add usage examples

### Adding New Data

1. Add to `/src/data/index.ts`
2. Define TypeScript type in `/src/types`
3. Document in relevant docs

---

## Questions?

- Check existing documentation in `/docs`
- Open an issue for questions
- Reach out to maintainers

---

**Thank you for contributing!** 🎉
