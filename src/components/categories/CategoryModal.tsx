"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@lib/api/categories";
import { Button } from "@heroui/react";
import { Modal } from "@heroui/react";
import { useForm } from "react-hook-form";

interface CategoryForm {
  name: string;
  description: string;
}

export function CategoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CategoryForm>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CategoryForm) => {
    try {
      await createCategory(data);
      setIsOpen(false);
      router.refresh();
      reset();
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button variant="primary" onPress={() => setIsOpen(true)}>
        Nueva Categoría
      </Button>

      <Modal.Root isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Crear Nueva Categoría</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                id="category-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <input
                  type="text"
                  {...register("name", { required: "Nombre requerido" })}
                  placeholder="Nombre de la categoría"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                />
                <textarea
                  {...register("description")}
                  placeholder="Descripción (opcional)"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  rows={3}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" onPress={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                form="category-form"
                isPending={isSubmitting}
              >
                Crear
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Root>
    </>
  );
}
