"use client";

import { useState } from "react";
import { updateDish, deleteDish } from "@lib/api/dishes";
import { Modal } from "@heroui/react";
import { GenericSelect } from "@components/atoms/select/GenericSelect";
import { GenericInput } from "@components/atoms/input";
import { GenericButton } from "@components/atoms/button";
import type { Dish } from "src/types";

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
      <GenericButton size="sm" variant="outline" onPress={() => setIsOpen(true)}>
        Editar
      </GenericButton>
      <GenericButton size="sm" variant="danger" onPress={handleDelete}>
        Eliminar
      </GenericButton>

      <Modal.Root isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Editar Plato</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <GenericInput
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nombre del plato"
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  rows={3}
                />
                <GenericInput
                  type="number"
                  step="0.01"
                  value={formData.price.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Precio"
                />
                <GenericSelect
                  value={formData.categoryId}
                  onChange={(value) =>
                    setFormData({ ...formData, categoryId: value as string })
                  }
                  options={categories.map((cat) => ({
                    id: cat.id,
                    label: cat.name,
                  }))}
                  placeholder="Selecciona una categoría"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <GenericButton variant="outline" onPress={() => setIsOpen(false)}>
                Cancelar
              </GenericButton>
              <GenericButton
                variant="primary"
                isPending={loading}
                onPress={handleUpdate}
              >
                Guardar
              </GenericButton>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Root>
    </div>
  );
}
