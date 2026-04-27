---
name: component-guide
description: Documents the RestaurantCMS component architecture. Use when building new components, refactoring existing ones, or asking about the component structure. Ensures generic components are prioritized in atoms/molecules/organisms before page-specific components.
---

# Component Guide Skill

## Purpose

This skill ensures the agent understands the RestaurantCMS component architecture and follows atomic design principles when creating or modifying components.

## When to Use

- Building new UI components
- Refactoring existing components
- Creating modals, forms, or reusable UI patterns
- Asking about component structure or purpose
- Creating page-specific components in `src/components/pages/`

## Core Principle: Generic First

**Before creating page-specific components, always consider the hierarchy:**

```
atoms/ → molecules/ → organisms/ → pages/
```

Ask yourself at each level:
1. **atoms/** - Can this be a simple primitive (button, input, badge)?
2. **molecules/** - Can this be a composed unit of atoms?
3. **organisms/** - Can this be a reusable complex component?
4. **pages/** - Only if domain-specific logic cannot be abstracted

## Component Architecture

### Atoms (`src/components/atoms/`)
Basic, indivisible UI primitives. Currently empty.
- Examples: Button, Input, Badge, Avatar, Label

### Molecules (`src/components/molecules/`)
Composed atoms forming functional units. Currently empty.
- Examples: SearchInput (Input + Button), CardHeader (Avatar + Label + Actions)

### Organisms (`src/components/organisms/`)
Complex reusable components with business logic.
- Current: `GenericModal` - Reusable modal wrapper using HeroUI

### Pages (`src/components/pages/`)
Domain-specific components tied to business logic.
- `categories/` - CategoryModal, CategoryActions, CategoriesList
- `dishes/` - DishModal, DishActions, DishesTable
- `menu/` - MenuDisplay, QRCodeGenerator
- `menu-styles/` - MenuStylesEditor
- `dashboard/` - DashboardSidebar

## Documenting New Components

**When creating a new component, immediately document it.**

Add to `COMPONENT_GUIDE.md`:
1. Component name and file path
2. Purpose and usage
3. Props interface
4. Usage example
5. Any dependencies on other components

## Refactoring Checklist

When encountering page-specific components that could be generic:

- [ ] Modal forms → Could use GenericModal?
- [ ] Edit/Delete actions → Could be an organism?
- [ ] Repeated patterns → Could be a molecule?
- [ ] Basic primitives → Should be in atoms?

## Current Component Reference

See [COMPONENT_GUIDE.md](../components/COMPONENT_GUIDE.md) for complete documentation of all existing components.

## Naming Conventions

- **Files:** PascalCase (e.g., `CategoryModal.tsx`)
- **Exports:** Named exports, PascalCase function name
- **Props Interfaces:** Suffix with component name (e.g., `CategoryModalProps`)
- **Directories:** kebab-case

## Key Patterns

### Modal Pattern
Prefer `GenericModal` for forms and content display:
```tsx
<GenericModal
  triggerText="Open"
  title="My Modal"
  footer={<Button>Confirm</Button>}
>
  <FormContent />
</GenericModal>
```

### State Management
- Use React Hook Form for form state
- Use controlled/uncontrolled patterns for reusable components
- Prefer `router.refresh()` over `window.location.reload()`

### Imports
- Path aliases: `@components/*`, `@lib/*`, `@/*`
- HeroUI from `@heroui/react`
- Types from `@/types`
