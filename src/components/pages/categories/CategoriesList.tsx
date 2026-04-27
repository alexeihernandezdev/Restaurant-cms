"use client";

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
      <EmptyState message="No hay categorías registradas. Crea tu primera categoría." />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-zinc-500 mt-1">
                  {category.description}
                </p>
              )}
              <p className="text-xs text-zinc-400 mt-2">
                {category._count?.dishes || 0} platos
              </p>
            </div>
            <CategoryActions category={category} />
          </div>
        </div>
      ))}
    </div>
  );
}
