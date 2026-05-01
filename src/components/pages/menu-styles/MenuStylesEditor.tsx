"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Palette, Save } from "lucide-react";
import { updateMenuStyle } from "@lib/api/menu-styles";
import { PageHeader } from "@components/molecules";
import { MenuStylesConfig } from "./MenuStylesConfig";
import { MenuStylesPreview } from "./MenuStylesPreview";
import type { MenuStyle } from "../../../types";

type FormValues = Omit<
  MenuStyle,
  "id" | "tenantId" | "logoUrl" | "coverImageUrl" | "tagline"
> & {
  tagline: string;
};

export function MenuStylesEditor({ menuStyle }: { menuStyle: MenuStyle }) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [values, setValuesState] = useState<FormValues>({
    template: menuStyle.template,
    primaryColor: menuStyle.primaryColor,
    secondaryColor: menuStyle.secondaryColor,
    accentColor: menuStyle.accentColor,
    backgroundColor: menuStyle.backgroundColor ?? "#ffffff",
    fontFamily: menuStyle.fontFamily,
    headingFont: menuStyle.headingFont ?? "playfair",
    layout: menuStyle.layout ?? "grid",
    cardStyle: menuStyle.cardStyle ?? "elevated",
    borderRadius: menuStyle.borderRadius ?? "medium",
    spacing: menuStyle.spacing ?? "cozy",
    showImages: menuStyle.showImages ?? true,
    showDescriptions: menuStyle.showDescriptions ?? true,
    priceStyle: menuStyle.priceStyle ?? "inline",
    headerStyle: menuStyle.headerStyle ?? "centered",
    dividerStyle: menuStyle.dividerStyle ?? "line",
    currency: menuStyle.currency ?? "$",
    tagline: menuStyle.tagline ?? "",
  });

  const setValues = (updater: (prev: FormValues) => FormValues) => {
    setValuesState(updater);
  };

  const onSubmit = async () => {
    await updateMenuStyle(menuStyle.id, {
      ...values,
      tagline: values.tagline.trim() || null,
    });
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader
        eyebrow="Diseño"
        title="Estilos del Menú"
        description="Personaliza la identidad visual de tu carta digital con plantillas y opciones avanzadas."
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:grid-cols-[460px_minmax(0,1fr)]">
        <MenuStylesConfig values={values} setValues={setValues} />
        <MenuStylesPreview menuStyle={menuStyle} values={values} />
      </div>
    </form>
  );
}
