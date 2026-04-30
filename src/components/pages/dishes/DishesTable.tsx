"use client";

import { ImageOff } from "lucide-react";
import type { Dish } from "../../../types";
import { DishActions } from "./DishActions";
import { EmptyState } from "@components/molecules";

interface DishesTableProps {
  dishes: Dish[];
  categories: { id: string; name: string }[];
}

export function DishesTable({ dishes, categories }: DishesTableProps) {
  if (dishes.length === 0) {
    return (
      <div className="p-6">
        <EmptyState message="No hay platos registrados" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-soft)] bg-surface-muted/50">
            <th className="py-3 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Plato
            </th>
            <th className="py-3 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Descripción
            </th>
            <th className="py-3 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Precio
            </th>
            <th className="py-3 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Categoría
            </th>
            <th className="py-3 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Estado
            </th>
            <th className="py-3 px-5 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr
              key={dish.id}
              className="border-b border-[var(--border-soft)] last:border-b-0 transition-colors hover:bg-surface-muted/40"
            >
              <td className="py-3 px-5">
                <div className="flex items-center gap-3">
                  {dish.imageUrl ? (
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="h-12 w-12 rounded-xl object-cover ring-1 ring-[var(--border-soft)]"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-zinc-400 ring-1 ring-[var(--border-soft)]">
                      <ImageOff className="h-4 w-4" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {dish.name}
                    </p>
                  </div>
                </div>
              </td>
              <td className="max-w-xs py-3 px-5">
                <p className="truncate text-sm text-zinc-500">
                  {dish.description || "Sin descripción"}
                </p>
              </td>
              <td className="py-3 px-5">
                <span className="font-semibold tracking-tight text-gradient-brand">
                  ${Number(dish.price).toFixed(2)}
                </span>
              </td>
              <td className="py-3 px-5">
                <span className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {categories.find((c) => c.id === dish.categoryId)?.name ||
                    "—"}
                </span>
              </td>
              <td className="py-3 px-5">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    dish.available
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      dish.available ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                  {dish.available ? "Disponible" : "No disponible"}
                </span>
              </td>
              <td className="py-3 px-5 text-right">
                <DishActions dish={dish} categories={categories} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
