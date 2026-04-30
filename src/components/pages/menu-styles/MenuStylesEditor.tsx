"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateMenuStyle } from "@lib/api/menu-styles";
import { GenericSelect } from "@components/atoms/select/GenericSelect";
import { RHFInput } from "@components/atoms/renderFields";
import type { SelectOption } from "@components/atoms/select/GenericSelect";

const TEMPLATES: SelectOption[] = [
  { id: "classic", label: "Clásico" },
  { id: "modern", label: "Moderno" },
  { id: "minimal", label: "Minimalista" },
  { id: "rustic", label: "Rústico" },
];

const FONTS: SelectOption[] = [
  { id: "inter", label: "Inter" },
  { id: "playfair", label: "Playfair Display" },
  { id: "lora", label: "Lora" },
  { id: "roboto", label: "Roboto" },
];

interface MenuStyle {
  id: string;
  template: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string | null;
  coverImageUrl: string | null;
}

type FormValues = Pick<MenuStyle, "template" | "primaryColor" | "secondaryColor" | "accentColor" | "fontFamily">;

export function MenuStylesEditor({ menuStyle }: { menuStyle: MenuStyle }) {
  const router = useRouter();
  const { register, watch, setValue, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      template: menuStyle.template,
      primaryColor: menuStyle.primaryColor,
      secondaryColor: menuStyle.secondaryColor,
      accentColor: menuStyle.accentColor,
      fontFamily: menuStyle.fontFamily,
    },
  });

  const formValues = watch();

  const onSubmit = async (data: FormValues) => {
    await updateMenuStyle(menuStyle.id, data);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Estilos del Menú</h1>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Plantilla</h2>
          <GenericSelect
            value={formValues.template}
            onChange={(value) => setValue("template", value as string)}
            options={TEMPLATES}
            placeholder="Selecciona una plantilla"
          />
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Colores</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Color Primario
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formValues.primaryColor}
                  onChange={(e) => setValue("primaryColor", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <RHFInput
                  type="text"
                  register={register}
                  name="primaryColor"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Color Secundario
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formValues.secondaryColor}
                  onChange={(e) => setValue("secondaryColor", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <RHFInput
                  type="text"
                  register={register}
                  name="secondaryColor"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Color de Acento
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formValues.accentColor}
                  onChange={(e) => setValue("accentColor", e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <RHFInput
                  type="text"
                  register={register}
                  name="accentColor"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tipografía</h2>
          <GenericSelect
            value={formValues.fontFamily}
            onChange={(value) => setValue("fontFamily", value as string)}
            options={FONTS}
            placeholder="Selecciona una tipografía"
          />
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Vista Previa</h2>
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: formValues.secondaryColor,
              fontFamily: formValues.fontFamily,
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: formValues.primaryColor }}
            >
              Menú de Ejemplo
            </h3>
            <div
              className="inline-block px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: formValues.accentColor,
                color: formValues.primaryColor,
              }}
            >
              Categoría Destacada
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
