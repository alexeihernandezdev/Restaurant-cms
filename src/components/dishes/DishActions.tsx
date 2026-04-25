"use client";

import { useState } from "react";
import { updateDish, deleteDish } from "@lib/api/dishes";
import { Button } from "@heroui/react";
import { Modal } from "@heroui/react";
import { Dish } from "../../types";

interface DishActionsProps {
  dish: Dish;
  categories: { id: string; name: string }[];
}

export function DishActions({ dish, categories }: DishActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: dish.name,
    description: dish.description || "",
    price: Number(dish.price),
    categoryId: dish.categoryId,
    available: dish.available,
  });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateDish(dish.id, formData);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este plato?")) return;
    setLoading(true);
    try {
      await deleteDish(dish.id);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onPress={() => setIsOpen(true)}>
        Editar
      </Button>
      <Button size="sm" variant="danger" onPress={handleDelete}>
        Eliminar
      </Button>

      <Modal.Root isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Editar Plato</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  rows={3}
                />
                <input
                  type="number"
                  step="0.01"
                  value={formData.price.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                />
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" onPress={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                isPending={loading}
                onPress={handleUpdate}
              >
                Guardar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Root>
    </div>
  );
}
