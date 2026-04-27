"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@lib/api/categories";
import { GenericModal } from "@components/organisms/GenericModal";
import { useForm } from "react-hook-form";
import { GenericInput } from "@components/atoms/input";
import { GenericButton } from "@components/atoms/button";

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
    formState: { isSubmitting, errors },
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
    <GenericModal
      triggerText="Nueva Categoría"
      title="Crear Nueva Categoría"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      footer={
        <>
          <GenericButton variant="outline" onPress={() => setIsOpen(false)}>
            Cancelar
          </GenericButton>
          <GenericButton
            variant="primary"
            type="submit"
            form="category-form"
            isPending={isSubmitting}
          >
            Crear
          </GenericButton>
        </>
      }
    >
      <form
        id="category-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <GenericInput
          type="text"
          {...register("name", { required: "Nombre requerido" })}
          placeholder="Nombre de la categoría"
        />
        <GenericInput
          type="text"
          {...register("description")}
          placeholder="Descripción (opcional)"
        />
      </form>
    </GenericModal>
  );
}
