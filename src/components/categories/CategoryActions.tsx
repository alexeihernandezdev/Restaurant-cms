"use client";

import { useState } from "react";
import { updateCategory, deleteCategory } from "@lib/api/categories";
import { Button } from "@heroui/react";
import { Modal } from "@heroui/react";

interface CategoryActionsProps {
  category: {
    id: string;
    name: string;
    description: string | null;
  };
}

export function CategoryActions({ category }: CategoryActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description || "",
  });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateCategory(category.id, formData);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "¿Estás seguro? Esto eliminará también todos los platos de esta categoría.",
      )
    )
      return;
    setLoading(true);
    try {
      await deleteCategory(category.id);
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
              <Modal.Heading>Editar Categoría</Modal.Heading>
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
