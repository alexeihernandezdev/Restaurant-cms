"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Palette, Type, LayoutTemplate, Eye, Save } from "lucide-react";
import { updateMenuStyle } from "@lib/api/menu-styles";
import { GenericSelect } from "@components/atoms/select/GenericSelect";
import { RHFInput } from "@components/atoms/renderFields";
import { PageHeader } from "@components/molecules";
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

type FormValues = Pick<
  MenuStyle,
  "template" | "primaryColor" | "secondaryColor" | "accentColor" | "fontFamily"
>;

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  registerInput: ReturnType<typeof useForm<FormValues>>["register"];
  name: keyof FormValues;
}

function ColorField({
  label,
  value,
  onChange,
  registerInput,
  name,
}: ColorFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <label
          className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-[var(--border-soft)] shadow-soft"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
        <div className="flex-1">
          <RHFInput type="text" register={registerInput} name={name} />
        </div>
      </div>
    </div>
  );
}

export function MenuStylesEditor({ menuStyle }: { menuStyle: MenuStyle }) {
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
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
      <PageHeader
        eyebrow="Diseño"
        title="Estilos del Menú"
        description="Personaliza la identidad visual de tu carta digital."
        icon={Palette}
        actions={
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
              <LayoutTemplate className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Plantilla
              </h2>
              <p className="text-xs text-zinc-500">
                Estructura visual del menú
              </p>
            </div>
          </div>
          <GenericSelect
            value={formValues.template}
            onChange={(value) => setValue("template", value as string)}
            options={TEMPLATES}
            placeholder="Selecciona una plantilla"
          />
        </section>

        <section className="rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
              <Palette className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Colores
              </h2>
              <p className="text-xs text-zinc-500">
                Define la paleta de tu marca
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <ColorField
              label="Color Primario"
              value={formValues.primaryColor}
              onChange={(value) => setValue("primaryColor", value)}
              registerInput={register}
              name="primaryColor"
            />
            <ColorField
              label="Color Secundario"
              value={formValues.secondaryColor}
              onChange={(value) => setValue("secondaryColor", value)}
              registerInput={register}
              name="secondaryColor"
            />
            <ColorField
              label="Color de Acento"
              value={formValues.accentColor}
              onChange={(value) => setValue("accentColor", value)}
              registerInput={register}
              name="accentColor"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              <Type className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Tipografía
              </h2>
              <p className="text-xs text-zinc-500">La fuente de tu carta</p>
            </div>
          </div>
          <GenericSelect
            value={formValues.fontFamily}
            onChange={(value) => setValue("fontFamily", value as string)}
            options={FONTS}
            placeholder="Selecciona una tipografía"
          />
        </section>

        <section className="rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Eye className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Vista Previa
              </h2>
              <p className="text-xs text-zinc-500">Así se verá tu menú</p>
            </div>
          </div>
          <div
            className="overflow-hidden rounded-xl p-6 ring-1 ring-[var(--border-soft)]"
            style={{
              backgroundColor: formValues.secondaryColor,
              fontFamily: formValues.fontFamily,
            }}
          >
            <h3
              className="mb-3 text-2xl font-bold"
              style={{ color: formValues.primaryColor }}
            >
              Menú de Ejemplo
            </h3>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: formValues.accentColor,
                color: formValues.primaryColor,
              }}
            >
              Categoría Destacada
            </span>
            <div
              className="mt-4 flex items-baseline justify-between border-t pt-3"
              style={{ borderColor: `${formValues.primaryColor}20` }}
            >
              <span
                style={{ color: formValues.primaryColor }}
                className="font-medium"
              >
                Plato del día
              </span>
              <span
                className="font-bold"
                style={{ color: formValues.accentColor }}
              >
                $12.50
              </span>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
