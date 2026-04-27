"use client";

import { Dish } from "../../types";
import { DishActions } from "./DishActions";
import { EmptyState } from "@components/molecules";

interface DishesTableProps {
  dishes: Dish[];
  categories: { id: string; name: string }[];
}

export function DishesTable({ dishes, categories }: DishesTableProps) {
  if (dishes.length === 0) {
    return (
      <EmptyState message="No hay platos registrados" />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th className="text-left py-3 px-4 font-medium text-zinc-500">
              Imagen
            </th>
            <th className="text-left py-3 px-4 font-medium text-zinc-500">
              Nombre
            </th>
            <th className="text-left py-3 px-4 font-medium text-zinc-500">
              Descripción
            </th>
            <th className="text-left py-3 px-4 font-medium text-zinc-500">
              Precio
            </th>
            <th className="text-left py-3 px-4 font-medium text-zinc-500">
              Categoría
            </th>
            <th className="text-left py-3 px-4 font-medium text-zinc-500">
              Disponible
            </th>
            <th className="text-left py-3 px-4 font-medium text-zinc-500">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr
              key={dish.id}
              className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <td className="py-3 px-4">
                {dish.imageUrl ? (
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded flex items-center justify-center text-zinc-400 text-xs">
                    Sin imagen
                  </div>
                )}
              </td>
              <td className="py-3 px-4 font-medium">{dish.name}</td>
              <td className="py-3 px-4 max-w-xs truncate text-zinc-500">
                {dish.description || "Sin descripción"}
              </td>
              <td className="py-3 px-4">${Number(dish.price).toFixed(2)}</td>
              <td className="py-3 px-4">
                {categories.find((c) => c.id === dish.categoryId)?.name || "-"}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    dish.available
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {dish.available ? "Sí" : "No"}
                </span>
              </td>
              <td className="py-3 px-4">
                <DishActions dish={dish} categories={categories} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
