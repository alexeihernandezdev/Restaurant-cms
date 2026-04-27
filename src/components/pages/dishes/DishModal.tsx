"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDish } from "@lib/api/dishes";
import { uploadImage } from "@lib/api/upload";
import { GenericModal } from "@components/organisms/GenericModal";
import { GenericSelect } from "@components/atoms/select/GenericSelect";
import { GenericInput } from "@components/atoms/input";
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

    try {
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
    } catch (error) {
      throw error;
    }
  };

  return (
    <GenericModal
      triggerText="Nuevo Plato"
      title="Crear Nuevo Plato"
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
            form="dish-form"
            isPending={isSubmitting}
          >
            Crear
          </GenericButton>
        </>
      }
    >
      <form
        id="dish-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <GenericInput
          type="text"
          {...register("name", { required: "Nombre requerido" })}
          placeholder="Nombre del plato"
        />
        <textarea
          {...register("description")}
          placeholder="Descripción (opcional)"
          className="w-full px-3 py-2 border border-zinc-300 rounded-md"
          rows={3}
        />
        <GenericInput
          type="number"
          step="0.01"
          {...register("price", { required: "Precio requerido" })}
          placeholder="Precio"
        />
        <GenericSelect
          value={categoryId}
          onChange={(value) => setCategoryId(value as string)}
          options={categories.map((cat) => ({ id: cat.id, label: cat.name }))}
          placeholder="Selecciona una categoría"
        />
        <DropZone
          onFileUpload={handleImageUpload}
          uploading={uploadingImage}
          isDisabled={isSubmitting}
        />
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-24 h-24 object-cover rounded"
            />
          </div>
        )}
      </form>
    </GenericModal>
  );
}
