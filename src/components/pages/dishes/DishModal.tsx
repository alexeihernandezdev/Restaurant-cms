"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, ImageIcon, Plus, Sparkles, X } from "lucide-react";
import { createDish } from "@lib/api/dishes";
import { uploadImage } from "@lib/api/upload";
import { GenericModal } from "@components/organisms/GenericModal";
import { GenericSelect } from "@components/atoms/select/GenericSelect";
import { RHFInput, RHFTextarea } from "@components/atoms/renderFields";
import { GenericButton } from "@components/atoms/button";
import { DropZone } from "@components/molecules";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";

interface DishModalProps {
  categories: { id: string; name: string }[];
}

interface DishForm {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  available: boolean;
}

export function DishModal({ categories }: DishModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<DishForm>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      available: true,
    },
  });

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 800 };
      const compressed = await imageCompression(file, options);

      const data = await uploadImage(compressed);
      if (data.url) {
        setImageUrl(data.url);
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: DishForm) => {
    if (!data.name || !data.price || !categoryId) return;

    await createDish({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      categoryId: categoryId,
      available: data.available,
      imageUrl,
    });
    setIsOpen(false);
    router.refresh();
    reset();
    setImageUrl("");
  };

  return (
    <GenericModal
      triggerText="Nuevo Plato"
      triggerIcon={Plus}
      title="Crear Nuevo Plato"
      description="Añade un platillo a tu carta con foto, precio y categoría."
      icon={ChefHat}
      iconClass="bg-gradient-brand text-white shadow-glow"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      size="lg"
      className="sm:max-w-2xl"
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
            form="dish-form"
            isPending={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl px-5 font-semibold shadow-glow"
          >
            {!isSubmitting && <Sparkles className="h-4 w-4" />}
            Crear plato
          </GenericButton>
        </>
      }
    >
      <form
        id="dish-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Nombre del plato
          </label>
          <RHFInput
            type="text"
            register={register}
            name="name"
            placeholder="Nombre del plato"
            isRequired
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Descripción
          </label>
          <RHFTextarea
            register={register}
            name="description"
            placeholder="Descripción (opcional)"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Precio
            </label>
            <RHFInput
              type="number"
              step="0.01"
              register={register}
              name="price"
              placeholder="Precio"
              isRequired
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Categoría
            </label>
            <GenericSelect
              value={categoryId}
              onChange={(value) => setCategoryId(value as string)}
              options={categories.map((cat) => ({
                id: cat.id,
                label: cat.name,
              }))}
              placeholder="Selecciona una categoría"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <ImageIcon className="h-3.5 w-3.5" />
            Imagen del plato
          </label>
          {imageUrl ? (
            <div className="group/img relative overflow-hidden rounded-xl border border-[var(--border-soft)] bg-surface-muted/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Vista previa"
                className="h-44 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/60 text-white opacity-0 backdrop-blur transition-opacity hover:bg-zinc-950/80 group-hover/img:opacity-100"
                aria-label="Quitar imagen"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <DropZone
              onFileUpload={handleImageUpload}
              uploading={uploadingImage}
              isDisabled={isSubmitting}
            />
          )}
        </div>
      </form>
    </GenericModal>
  );
}
