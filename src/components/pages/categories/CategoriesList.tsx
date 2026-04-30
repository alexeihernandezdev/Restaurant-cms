"use client";

import { FolderTree } from "lucide-react";
import { CategoryActions } from "./CategoryActions";
import { EmptyState } from "@components/molecules";

interface Category {
  id: string;
  name: string;
  description: string | null;
  order: number;
  tenantId: string;
  _count?: { dishes: number };
}

interface CategoriesListProps {
  categories: Category[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border-soft)] bg-surface shadow-soft">
        <EmptyState message="No hay categorías registradas. Crea tu primera categoría." />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <article
          key={category.id}
          className="group relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100"
          />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400">
                <FolderTree className="h-4.5 w-4.5" strokeWidth={2.25} />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold tracking-tight">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
            <CategoryActions category={category} />
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[var(--border-soft)] pt-4">
            <span className="text-xs font-medium text-zinc-500">
              {category._count?.dishes ?? 0}{" "}
              {(category._count?.dishes ?? 0) === 1 ? "plato" : "platos"}
            </span>
            <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Activa
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
