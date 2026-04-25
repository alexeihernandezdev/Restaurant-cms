---
name: api-wrapper
description: Centralize all Next.js API calls through typed wrapper functions in src/lib/api/. Use when making fetch calls to /api/* endpoints, creating API utility functions, or refactoring components to use centralized API methods.
---

# API Wrapper

## Rule

**Never use `fetch()` directly** - use the `fetcher` utility from `./fetcher`.

## fetcher signature

```typescript
fetcher<T>(path: string, options: FetcherOptions): Promise<T>

// FetcherOptions:
interface FetcherOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
}
```

## Pattern

All API calls go through `src/lib/api/` wrappers using `fetcher`:

```typescript
// src/lib/api/categories.ts
import { fetcher } from "./fetcher";

export async function createCategory(data: CategoryInput) {
  return fetcher("/api/categories", { method: "POST", body: data });
}

export async function updateCategory(id: string, data: CategoryInput) {
  return fetcher(`/api/categories/${id}`, { method: "PUT", body: data });
}

export async function deleteCategory(id: string) {
  return fetcher(`/api/categories/${id}`, { method: "DELETE" });
}
```

For FormData (file uploads), pass empty headers to avoid JSON content-type:

```typescript
// src/lib/api/upload.ts
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return fetcher<{ url: string }>("/api/upload", {
    method: "POST",
    body: formData,
    headers: {}, // override Content-Type
  });
}
```

## Barrel export

```typescript
// src/lib/api/index.ts
export * from "./auth";
export * from "./categories";
export * from "./dishes";
export * from "./upload";
export * from "./menu-styles";
export { fetcher } from "./fetcher";
```

## Available Wrappers

| File             | Exports                                              |
| ---------------- | ---------------------------------------------------- |
| `auth.ts`        | `register`                                           |
| `categories.ts`  | `createCategory`, `updateCategory`, `deleteCategory` |
| `dishes.ts`      | `createDish`, `updateDish`, `deleteDish`             |
| `upload.ts`      | `uploadImage`                                        |
| `menu-styles.ts` | `updateMenuStyle`                                    |

## Error Handling

`fetcher` throws on non-ok responses with `Error(error.error || message)`. Components should catch and re-throw or handle UI feedback.
