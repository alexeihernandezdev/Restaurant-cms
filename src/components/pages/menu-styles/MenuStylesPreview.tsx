"use client";

import { useMemo } from "react";
import { Eye } from "lucide-react";
import { MenuDisplay } from "@components/pages/menu/MenuDisplay";
import type { MenuStyle } from "../../../types";

const SAMPLE_TENANT = {
  name: "Restaurante Demo",
  slug: "demo",
  logoUrl: null,
  categories: [
    {
      id: "starters",
      name: "Entrantes",
      description: "Para abrir el apetito",
      dishes: [
        {
          id: "d1",
          name: "Bruschetta de tomate",
          description:
            "Pan tostado con tomate fresco, albahaca y aceite de oliva.",
          price: 8.5,
          imageUrl:
            "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=600&q=80",
          available: true,
        },
        {
          id: "d2",
          name: "Carpaccio de res",
          description: "Finas láminas con rúcula, parmesano y limón.",
          price: 14.0,
          imageUrl:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
          available: true,
        },
        {
          id: "d3",
          name: "Tabla de quesos",
          description: "Selección de quesos artesanales con frutos secos.",
          price: 16.5,
          imageUrl: null,
          available: true,
        },
      ],
    },
    {
      id: "mains",
      name: "Principales",
      description: "Nuestras especialidades",
      dishes: [
        {
          id: "m1",
          name: "Risotto de hongos",
          description: "Arroz cremoso con hongos silvestres y trufa negra.",
          price: 22.0,
          imageUrl:
            "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
          available: true,
        },
        {
          id: "m2",
          name: "Salmón a la parrilla",
          description: "Filete con vegetales asados y salsa de eneldo.",
          price: 28.5,
          imageUrl:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
          available: true,
        },
      ],
    },
  ],
};

type FormValues = Omit<
  MenuStyle,
  "id" | "tenantId" | "logoUrl" | "coverImageUrl" | "tagline"
> & {
  tagline: string;
};

interface MenuStylesPreviewProps {
  menuStyle: MenuStyle;
  values: FormValues;
}

export function MenuStylesPreview({ menuStyle, values }: MenuStylesPreviewProps) {
  const previewTenant = useMemo(
    () => ({
      ...SAMPLE_TENANT,
      menuStyle: {
        id: menuStyle.id,
        tenantId: menuStyle.tenantId,
        logoUrl: menuStyle.logoUrl,
        coverImageUrl: menuStyle.coverImageUrl,
        ...values,
        tagline: values.tagline.trim() || null,
      } as MenuStyle,
    }),
    [
      values,
      menuStyle.id,
      menuStyle.tenantId,
      menuStyle.logoUrl,
      menuStyle.coverImageUrl,
    ],
  );

  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      <div className="mb-3 flex items-center gap-2">
        <Eye className="h-4 w-4 text-primary-600" />
        <h2 className="text-sm font-semibold tracking-tight">
          Vista previa en vivo
        </h2>
        <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          En tiempo real
        </span>
      </div>
      <div className="overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-surface-muted/30 shadow-elevated">
        <div className="flex items-center gap-1.5 border-b border-[var(--border-soft)] bg-surface px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate text-[11px] text-zinc-500">
            /{menuStyle.tenantId.slice(0, 8)}/menu
          </span>
        </div>
        <div
          className="max-h-[80vh] overflow-y-auto"
          style={{ backgroundColor: values.secondaryColor }}
        >
          <MenuDisplay tenant={previewTenant} preview />
        </div>
      </div>
    </div>
  );
}