w---
name: database-layer
description: Use when working with database operations, Prisma queries, or any code that needs to fetch/create/update/delete data. Provides centralized database function imports to avoid direct Prisma client usage.

---

# Database Layer

## Rule

**Never use `prisma` directly** in any `.ts` file. Import functions from `@lib/db/*` instead.

## Available Functions

Import from `@lib/db` for the barrel export, or from specific modules:

| Module               | Functions                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `@lib/db/dishes`     | `getDishes`, `createDish`, `updateDish`, `deleteDish`, `getDishById`, `getDishCount`                         |
| `@lib/db/categories` | `getCategories`, `createCategory`, `updateCategory`, `deleteCategory`, `getCategoryById`, `getCategoryCount` |
| `@lib/db/menuStyles` | `getMenuStyle`, `createMenuStyle`, `updateMenuStyle`, `getMenuStyleById`                                     |
| `@lib/db/tenants`    | `getTenant`, `getTenantBySlug`, `getTenantFromRequest`, `tenantExistsBySlug`                                 |
| `@lib/db/users`      | `getUserByEmail`, `createUserWithTenant`, `userExistsByEmail`                                                |
| `@lib/db`            | Re-exports all of the above                                                                                  |

## Example Usage

```typescript
// Instead of: import { prisma } from "@lib/prisma";
import { getDishes, createDish } from "@lib/db/dishes";

// Fetching
const dishes = await getDishes(tenantId);
const dishesFiltered = await getDishes(tenantId, categoryId);

// Creating
const newDish = await createDish({ name, price, categoryId }, tenantId);

// Updating
const updated = await updateDish(id, tenantId, { name: "New Name" });

// Deleting
await deleteDish(id, tenantId);
```

## Adding New Functions

When a needed database function doesn't exist:

1. Add it to the appropriate file in `src/lib/db/`
2. Follow the naming convention: `getX`, `createX`, `updateX`, `deleteX`
3. Import `prisma` from `@lib/prisma` inside the function (only place that should)
4. Export it from the module's `index.ts` (already done via barrel export in `index.ts`)

## Only Prisma-Allowed File

`src/lib/prisma.ts` is the **only** file that imports `PrismaClient` directly. Do not add Prisma imports anywhere else.
