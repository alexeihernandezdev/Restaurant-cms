# RestaurantCMS Component Guide

This guide documents the component architecture for the RestaurantCMS project, following atomic design principles.

## Component Hierarchy

```
├── atoms/           # Basic, indivisible UI primitives
├── molecules/       # Composed atoms into functional units
├── organisms/       # Complex UI components with business logic
├── pages/           # Page-specific components (business domain)
│   ├── categories/
│   ├── dishes/
│   ├── menu/
│   ├── menu-styles/
│   └── dashboard/
└── templates/       # Page layout templates
```

## Atoms

**Purpose:** Basic HTML elements or simple UI primitives that cannot be broken down further.

### GenericInput

**File:** `src/components/atoms/input/GenericInput.tsx`

A reusable input component built on HeroUI Input.

**Props:**
- `type?: "text" | "number" | "email" | "password" | "tel" | "url"` - Input type
- `placeholder?: string` - Placeholder text
- `label?: string` - Label text
- `value?: string | number` - Controlled value
- `defaultValue?: string | number` - Default value for uncontrolled
- `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void` - Change handler
- `register?: UseFormRegister<Record<string, unknown>>` - React Hook Form register
- `name?: string` - Field name
- `errorMessage?: string` - Error message to display
- `isRequired?: boolean` - Required field
- `isDisabled?: boolean` - Disabled state
- `isInvalid?: boolean` - Invalid state
- `isReadOnly?: boolean` - Read-only state
- `min?: number` - Minimum value
- `max?: number` - Maximum value
- `step?: number` - Step value
- `minLength?: number` - Minimum length
- `maxLength?: number` - Maximum length
- `pattern?: string` - Validation pattern
- `className?: string` - Custom CSS class
- `fullWidth?: boolean` - Full width (default: true)

**Usage Example:**
```tsx
// Controlled
<GenericInput
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter name"
/>

// With React Hook Form
<GenericInput
  type="text"
  {...register("name", { required: "Name is required" })}
  isInvalid={!!errors.name}
  errorMessage={errors.name?.message}
/>
```

### GenericSelect

**File:** `src/components/atoms/select/GenericSelect.tsx`

A reusable select component built on HeroUI Select.

**Props:**
- `value?: Key | null` - Controlled value
- `defaultValue?: Key | null` - Default value
- `onChange?: (value: Key | null) => void` - Change handler
- `options: SelectOption[]` - Select options
- `label?: string` - Label text
- `placeholder?: string` - Placeholder text
- `isRequired?: boolean` - Required field
- `isDisabled?: boolean` - Disabled state
- `isInvalid?: boolean` - Invalid state
- `errorMessage?: string` - Error message
- `name?: string` - Field name
- `fullWidth?: boolean` - Full width (default: true)
- `variant?: "primary" | "secondary"` - Visual variant
- `className?: string` - Custom CSS class

## Molecules

**Purpose:** Simple groups of UI components that function together as a unit.

### EmptyState

**File:** `src/components/molecules/EmptyState.tsx`

A reusable empty state component with icon and optional action button.

**Props:**
- `message: string` - The message to display
- `actionLabel?: string` - Label for optional action button
- `onAction?: () => void` - Handler for optional action

**Usage Example:**
```tsx
<EmptyState
  message="No hay platos registrados"
  actionLabel="Crear plato"
  onAction={() => router.push("/dashboard/dishes/new")}
/>
```

### DropZone

**File:** `src/components/molecules/DropZone.tsx`

Image upload dropzone component using react-dropzone.

## Organisms

### GenericModal

**File:** `src/components/organisms/GenericModal.tsx`

A reusable modal component built on HeroUI Modal.

**Props:**
- `triggerText?: string` - Button text to open modal
- `title: string` - Modal title
- `children: ReactNode` - Modal content
- `footer?: ReactNode` - Modal footer content
- `isOpen?: boolean` - Controlled open state
- `onOpenChange?: (isOpen: boolean) => void` - Controlled state handler
- `size?: "xs" | "sm" | "md" | "lg" | "cover" | "full"`
- `placement?: "auto" | "top" | "center" | "bottom"`
- `isDismissable?: boolean`
- `isKeyboardDismissDisabled?: boolean`
- `className?: string`

**Usage Example:**
```tsx
<GenericModal
  triggerText="Open"
  title="My Modal"
  footer={<Button>Confirm</Button>}
>
  <FormContent />
</GenericModal>
```

### When to Use GenericModal vs Specific Modal

- Use **GenericModal** for forms or content that can be reused across different entities
- Use a **specific modal component** when the modal has domain-specific logic that cannot be abstracted

## Pages Components

### Categories

#### CategoryModal

**File:** `src/components/pages/categories/CategoryModal.tsx`

Creates a new category with name and description. Uses internal state management.

**Note:** Consider refactoring to use GenericModal for consistency.

#### CategoryActions

**File:** `src/components/pages/categories/CategoryActions.tsx`

Provides edit and delete actions for a category. Uses native browser reload for refresh.

**Props:**
- `category: { id, name, description }`

#### CategoriesList

**File:** `src/components/pages/categories/CategoriesList.tsx`

Grid display of all categories. Shows dish count per category.

**Props:**
- `categories: Category[]`

### Dishes

#### DishModal

**File:** `src/components/pages/dishes/DishModal.tsx`

Creates a new dish with image upload support. Uses GenericModal internally.

**Props:**
- `categories: { id: string; name: string }[]`

#### DishActions

**File:** `src/components/pages/dishes/DishActions.tsx`

Provides edit and delete actions for a dish.

**Props:**
- `dish: Dish`
- `categories: { id: string; name: string }[]`

#### DishesTable

**File:** `src/components/pages/dishes/DishesTable.tsx`

Table display of dishes with image, name, description, price, category, availability, and actions.

**Props:**
- `dishes: Dish[]`
- `categories: { id: string; name: string }[]`

### Menu

#### MenuDisplay

**File:** `src/components/pages/menu/MenuDisplay.tsx`

Public menu display with customizable styling based on tenant's MenuStyle.

**Props:**
- `tenant: { name, slug, logoUrl, menuStyle, categories[] }`

#### QRCodeGenerator

**File:** `src/components/pages/menu/QRCodeGenerator.tsx`

Generates and displays a downloadable QR code for the menu URL.

**Props:**
- `tenantSlug: string`

### Dashboard

#### DashboardSidebar

**File:** `src/components/pages/dashboard/Sidebar.tsx`

Navigation sidebar for the dashboard with user info and logout.

**Props:**
- `user: { name?, email }`

## Guidelines for New Components

### Priority: Generic Components First

Before creating page-specific components, always consider:

1. **Can this be an atom?** Simple UI primitive (button, input, badge)
2. **Can this be a molecule?** Composed atoms that form a functional unit
3. **Can this be an organism?** Reusable complex component with business logic

### Naming Conventions

- **Files:** PascalCase (e.g., `CategoryModal.tsx`)
- **Exports:** Named exports, PascalCase function name
- **Props Interfaces:** Suffix with component name (e.g., `CategoryModalProps`)
- **Directories:** kebab-case

### Component Structure

```tsx
"use client";

import { /* HeroUI imports */ } from "@heroui/react";
import { /* React imports */ } from "react";

interface ComponentNameProps {
  // Props definition
}

export function ComponentName({ props }: ComponentNameProps) {
  return (
    // JSX
  );
}
```

### State Management

- Use React Hook Form for form state
- Use controlled/uncontrolled patterns for reusable components
- Prefer `router.refresh()` over `window.location.reload()`

### Imports

- Use path aliases: `@components/*`, `@lib/*`, `@/*`
- HeroUI components from `@heroui/react`
- Types from `@/types`

## TODO: Refactoring Opportunities

1. **CategoryModal** → Should use GenericModal for form wrapper
2. **QRCodeGenerator** → Modal part could use GenericModal
3. **CategoryActions/DishActions** → Modal edit forms could be extracted to organisms
4. **Empty atoms/molecules directories** → Extract reusable primitives from pages components
