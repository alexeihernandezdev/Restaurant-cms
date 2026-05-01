"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus, Plus, Sparkles } from "lucide-react";
import { createCategory } from "@lib/api/categories";
import { GenericModal } from "@components/organisms/GenericModal";
import { useForm } from "react-hook-form";
import { RHFInput } from "@components/atoms/renderFields";
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
    await createCategory(data);
    setIsOpen(false);
    router.refresh();
    reset();
  };

  return (
    <GenericModal
      triggerText="Nueva Categoría"
      triggerIcon={Plus}
      title="Crear Nueva Categoría"
      description="Agrupa platos similares para que tu carta sea fácil de navegar."
      icon={FolderPlus}
      iconClass="bg-gradient-brand text-white shadow-glow"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      footer={
        <>
          <GenericButton
            variant="ghost"
            onPress={() => setIsOpen(false)}
            className="rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Cancelar
          </GenericButton>
          <GenericButton
            variant="primary"
            type="submit"
            form="category-form"
            isPending={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl px-5 font-semibold shadow-glow"
          >
            {!isSubmitting && <Sparkles className="h-4 w-4" />}
            Crear categoría
          </GenericButton>
        </>
      }
    >
      <form
        id="category-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Nombre
          </label>
          <RHFInput
            type="text"
            register={register}
            name="name"
            placeholder="Nombre de la categoría"
            isRequired
            error={errors.name?.message as string}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Descripción
          </label>
          <RHFInput
            type="text"
            register={register}
            name="description"
            placeholder="Descripción (opcional)"
          />
          <p className="text-[11px] text-zinc-400">
            Aparece bajo el título de la categoría en el menú público.
          </p>
        </div>
      </form>
    </GenericModal>
  );
}
