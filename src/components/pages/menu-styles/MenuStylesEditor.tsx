"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Palette,
  Type,
  LayoutTemplate,
  Eye,
  Save,
  Sparkles,
  Settings2,
  ImageIcon,
  Check,
} from "lucide-react";
import { updateMenuStyle } from "@lib/api/menu-styles";
import { GenericSelect } from "@components/atoms/select/GenericSelect";
import type { SelectOption } from "@components/atoms/select/GenericSelect";
import { PageHeader } from "@components/molecules";
import { MenuDisplay } from "@components/pages/menu/MenuDisplay";
import type { MenuStyle } from "../../../types";
import {
  TEMPLATES,
  FONTS,
  LAYOUTS,
  CARD_STYLES,
  BORDER_RADII,
  SPACINGS,
  PRICE_STYLES,
  HEADER_STYLES,
  DIVIDER_STYLES,
  CURRENCIES,
  getTemplate,
} from "./templates";

type FormValues = Omit<
  MenuStyle,
  "id" | "tenantId" | "logoUrl" | "coverImageUrl" | "tagline"
> & {
  tagline: string;
};

const FONT_OPTIONS: SelectOption[] = FONTS.map((f) => ({
  id: f.id,
  label: f.label,
}));

const LAYOUT_OPTIONS: SelectOption[] = LAYOUTS.map((l) => ({
  id: l.id,
  label: l.label,
}));

const CARD_STYLE_OPTIONS: SelectOption[] = CARD_STYLES.map((c) => ({
  id: c.id,
  label: c.label,
}));

const BORDER_RADIUS_OPTIONS: SelectOption[] = BORDER_RADII.map((b) => ({
  id: b.id,
  label: b.label,
}));

const SPACING_OPTIONS: SelectOption[] = SPACINGS.map((s) => ({
  id: s.id,
  label: s.label,
}));

const PRICE_STYLE_OPTIONS: SelectOption[] = PRICE_STYLES.map((p) => ({
  id: p.id,
  label: p.label,
}));

const HEADER_STYLE_OPTIONS: SelectOption[] = HEADER_STYLES.map((h) => ({
  id: h.id,
  label: h.label,
}));

const DIVIDER_STYLE_OPTIONS: SelectOption[] = DIVIDER_STYLES.map((d) => ({
  id: d.id,
  label: d.label,
}));

const CURRENCY_OPTIONS: SelectOption[] = CURRENCIES.map((c) => ({
  id: c.id,
  label: c.label,
}));

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <label
          className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-1 ring-[var(--border-soft)] shadow-soft"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-[var(--border-soft)] bg-surface px-3 py-2 font-mono text-xs uppercase tracking-wider focus:border-primary-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

interface ToggleFieldProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function ToggleField({
  label,
  description,
  value,
  onChange,
}: ToggleFieldProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border-soft)] bg-surface-muted/40 p-3 text-left transition-colors hover:bg-surface-muted"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-[11px] text-zinc-500">{description}</p>
        )}
      </div>
      <span
        className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors ${
          value ? "bg-gradient-brand" : "bg-zinc-300 dark:bg-zinc-600"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

interface SectionProps {
  icon: typeof Palette;
  iconClass: string;
  title: string;
  description: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Section({
  icon: Icon,
  iconClass,
  title,
  description,
  defaultOpen = true,
  children,
}: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-2xl border border-[var(--border-soft)] bg-surface shadow-soft">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 p-5 text-left"
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <p className="truncate text-xs text-zinc-500">{description}</p>
        </div>
        <span
          aria-hidden
          className={`text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="border-t border-[var(--border-soft)] p-5">
          {children}
        </div>
      )}
    </section>
  );
}

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

export function MenuStylesEditor({ menuStyle }: { menuStyle: MenuStyle }) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [values, setValues] = useState<FormValues>({
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

  const setValue = <K extends keyof FormValues>(key: K, val: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const applyTemplate = (templateId: string) => {
    const tpl = getTemplate(templateId);
    if (!tpl) {
      setValue("template", templateId);
      return;
    }
    setValues((prev) => ({
      ...prev,
      ...tpl.config,
    }));
  };

  const onSubmit = async () => {
    await updateMenuStyle(menuStyle.id, {
      ...values,
      tagline: values.tagline.trim() || null,
    });
    router.refresh();
  };

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] xl:grid-cols-[minmax(0,1fr)_460px]">
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

        <div className="space-y-4">
          <Section
            icon={Sparkles}
            iconClass="bg-gradient-brand text-white"
            title="Plantilla"
            description="Aplica un estilo predefinido"
            defaultOpen
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TEMPLATES.map((tpl) => {
                const active = values.template === tpl.id;
                return (
                  <button
                    type="button"
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl.id)}
                    className={`group relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                      active
                        ? "border-primary-500 ring-2 ring-primary-500/30"
                        : "border-[var(--border-soft)] hover:border-primary-300"
                    }`}
                  >
                    <div
                      className="mb-2 h-16 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${tpl.preview.background} 0%, ${tpl.preview.background} 60%, ${tpl.preview.accent} 100%)`,
                      }}
                    >
                      <div className="flex h-full items-center justify-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: tpl.preview.primary }}
                        />
                        <span
                          className="h-2 w-8 rounded-full"
                          style={{
                            backgroundColor: tpl.preview.primary,
                            opacity: 0.6,
                          }}
                        />
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: tpl.preview.accent }}
                        />
                      </div>
                    </div>
                    <p className="text-xs font-semibold tracking-tight">
                      {tpl.label}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-zinc-500">
                      {tpl.description}
                    </p>
                    {active && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section
            icon={Palette}
            iconClass="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
            title="Colores"
            description="Paleta de tu marca"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <ColorField
                label="Texto principal"
                value={values.primaryColor}
                onChange={(v) => setValue("primaryColor", v)}
              />
              <ColorField
                label="Fondo de página"
                value={values.secondaryColor}
                onChange={(v) => setValue("secondaryColor", v)}
              />
              <ColorField
                label="Color de acento"
                value={values.accentColor}
                onChange={(v) => setValue("accentColor", v)}
              />
              <ColorField
                label="Fondo de tarjetas"
                value={values.backgroundColor}
                onChange={(v) => setValue("backgroundColor", v)}
              />
            </div>
          </Section>

          <Section
            icon={Type}
            iconClass="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
            title="Tipografía"
            description="Fuentes para títulos y cuerpo"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Títulos
                </label>
                <GenericSelect
                  value={values.headingFont}
                  onChange={(v) => setValue("headingFont", v as string)}
                  options={FONT_OPTIONS}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Cuerpo
                </label>
                <GenericSelect
                  value={values.fontFamily}
                  onChange={(v) => setValue("fontFamily", v as string)}
                  options={FONT_OPTIONS}
                />
              </div>
            </div>
          </Section>

          <Section
            icon={LayoutTemplate}
            iconClass="bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
            title="Disposición"
            description="Cómo se distribuyen los platos"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Modo de lista
                </label>
                <GenericSelect
                  value={values.layout}
                  onChange={(v) => setValue("layout", v as string)}
                  options={LAYOUT_OPTIONS}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Estilo de tarjeta
                </label>
                <GenericSelect
                  value={values.cardStyle}
                  onChange={(v) => setValue("cardStyle", v as string)}
                  options={CARD_STYLE_OPTIONS}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Bordes redondeados
                </label>
                <GenericSelect
                  value={values.borderRadius}
                  onChange={(v) => setValue("borderRadius", v as string)}
                  options={BORDER_RADIUS_OPTIONS}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Espaciado
                </label>
                <GenericSelect
                  value={values.spacing}
                  onChange={(v) => setValue("spacing", v as string)}
                  options={SPACING_OPTIONS}
                />
              </div>
            </div>
          </Section>

          <Section
            icon={ImageIcon}
            iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
            title="Cabecera"
            description="Estilo de la portada del menú"
          >
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Estilo
                </label>
                <GenericSelect
                  value={values.headerStyle}
                  onChange={(v) => setValue("headerStyle", v as string)}
                  options={HEADER_STYLE_OPTIONS}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Eslogan (opcional)
                </label>
                <input
                  type="text"
                  value={values.tagline}
                  onChange={(e) => setValue("tagline", e.target.value)}
                  placeholder="Cocina de autor con producto local"
                  maxLength={80}
                  className="w-full rounded-lg border border-[var(--border-soft)] bg-surface px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </Section>

          <Section
            icon={Settings2}
            iconClass="bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400"
            title="Detalles del menú"
            description="Precios, separadores y más"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Estilo de precio
                </label>
                <GenericSelect
                  value={values.priceStyle}
                  onChange={(v) => setValue("priceStyle", v as string)}
                  options={PRICE_STYLE_OPTIONS}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Separador
                </label>
                <GenericSelect
                  value={values.dividerStyle}
                  onChange={(v) => setValue("dividerStyle", v as string)}
                  options={DIVIDER_STYLE_OPTIONS}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Moneda
                </label>
                <GenericSelect
                  value={values.currency}
                  onChange={(v) => setValue("currency", v as string)}
                  options={CURRENCY_OPTIONS}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <ToggleField
                label="Mostrar imágenes"
                description="Imágenes de los platos en el menú"
                value={values.showImages}
                onChange={(v) => setValue("showImages", v)}
              />
              <ToggleField
                label="Mostrar descripciones"
                description="Descripciones de cada plato"
                value={values.showDescriptions}
                onChange={(v) => setValue("showDescriptions", v)}
              />
            </div>
          </Section>
        </div>
      </div>
    </form>
  );
}
