"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDish } from "@lib/api/dishes";
import { uploadImage } from "@lib/api/upload";
import { Button } from "@heroui/react";
import { Modal } from "@heroui/react";
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
      categoryId: categories[0]?.id || "",
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
    if (!data.name || !data.price || !data.categoryId) return;

    try {
      await createDish({
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        categoryId: data.categoryId,
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
    <>
      <Button variant="primary" onPress={() => setIsOpen(true)}>
        Nuevo Plato
      </Button>

      <Modal.Root isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Crear Nuevo Plato</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                id="dish-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <input
                  type="text"
                  {...register("name", { required: "Nombre requerido" })}
                  placeholder="Nombre del plato"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                />
                <textarea
                  {...register("description")}
                  placeholder="Descripción (opcional)"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                  rows={3}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { required: "Precio requerido" })}
                  placeholder="Precio"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                />
                <select
                  {...register("categoryId", {
                    required: "Categoría requerida",
                  })}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Imagen
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="w-full"
                  />
                  {uploadingImage && (
                    <p className="text-sm text-zinc-500 mt-1">
                      Subiendo imagen...
                    </p>
                  )}
                  {imageUrl && (
                    <div className="mt-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" onPress={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                form="dish-form"
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
