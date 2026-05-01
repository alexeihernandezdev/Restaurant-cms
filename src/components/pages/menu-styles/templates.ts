export interface MenuStyleConfig {
  template: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  headingFont: string;
  layout: string;
  cardStyle: string;
  borderRadius: string;
  spacing: string;
  showImages: boolean;
  showDescriptions: boolean;
  priceStyle: string;
  headerStyle: string;
  dividerStyle: string;
  currency: string;
  tagline: string | null;
}

export interface TemplatePreset {
  id: string;
  label: string;
  description: string;
  preview: {
    background: string;
    primary: string;
    accent: string;
  };
  config: Omit<MenuStyleConfig, "currency" | "tagline">;
}

export const TEMPLATES: TemplatePreset[] = [
  {
    id: "classic",
    label: "Clásico",
    description: "Carta tradicional con elegancia atemporal",
    preview: {
      background: "#fdf8f1",
      primary: "#2c1810",
      accent: "#c9a961",
    },
    config: {
      template: "classic",
      primaryColor: "#2c1810",
      secondaryColor: "#fdf8f1",
      accentColor: "#c9a961",
      backgroundColor: "#fffaf0",
      fontFamily: "lora",
      headingFont: "playfair",
      layout: "list",
      cardStyle: "flat",
      borderRadius: "small",
      spacing: "comfortable",
      showImages: true,
      showDescriptions: true,
      priceStyle: "dotted",
      headerStyle: "centered",
      dividerStyle: "ornament",
    },
  },
  {
    id: "modern",
    label: "Moderno",
    description: "Diseño limpio con tipografías bold",
    preview: {
      background: "#ffffff",
      primary: "#0f172a",
      accent: "#ef4444",
    },
    config: {
      template: "modern",
      primaryColor: "#0f172a",
      secondaryColor: "#f8fafc",
      accentColor: "#ef4444",
      backgroundColor: "#ffffff",
      fontFamily: "inter",
      headingFont: "inter",
      layout: "grid",
      cardStyle: "elevated",
      borderRadius: "large",
      spacing: "cozy",
      showImages: true,
      showDescriptions: true,
      priceStyle: "bold",
      headerStyle: "hero",
      dividerStyle: "line",
    },
  },
  {
    id: "minimal",
    label: "Minimalista",
    description: "Espacio en blanco, sin distracciones",
    preview: {
      background: "#fafafa",
      primary: "#18181b",
      accent: "#71717a",
    },
    config: {
      template: "minimal",
      primaryColor: "#18181b",
      secondaryColor: "#fafafa",
      accentColor: "#71717a",
      backgroundColor: "#ffffff",
      fontFamily: "inter",
      headingFont: "inter",
      layout: "list",
      cardStyle: "flat",
      borderRadius: "none",
      spacing: "comfortable",
      showImages: false,
      showDescriptions: true,
      priceStyle: "inline",
      headerStyle: "minimal",
      dividerStyle: "line",
    },
  },
  {
    id: "rustic",
    label: "Rústico",
    description: "Tonos cálidos y textura artesanal",
    preview: {
      background: "#f5e6d3",
      primary: "#3e2723",
      accent: "#a0522d",
    },
    config: {
      template: "rustic",
      primaryColor: "#3e2723",
      secondaryColor: "#f5e6d3",
      accentColor: "#a0522d",
      backgroundColor: "#faf3e8",
      fontFamily: "lora",
      headingFont: "playfair",
      layout: "grid",
      cardStyle: "bordered",
      borderRadius: "small",
      spacing: "cozy",
      showImages: true,
      showDescriptions: true,
      priceStyle: "dotted",
      headerStyle: "banner",
      dividerStyle: "ornament",
    },
  },
  {
    id: "elegant",
    label: "Elegante",
    description: "Lujo oscuro con acentos dorados",
    preview: {
      background: "#0a0a0a",
      primary: "#f5e6c8",
      accent: "#d4af37",
    },
    config: {
      template: "elegant",
      primaryColor: "#f5e6c8",
      secondaryColor: "#0a0a0a",
      accentColor: "#d4af37",
      backgroundColor: "#141414",
      fontFamily: "lora",
      headingFont: "playfair",
      layout: "list",
      cardStyle: "flat",
      borderRadius: "small",
      spacing: "comfortable",
      showImages: true,
      showDescriptions: true,
      priceStyle: "dotted",
      headerStyle: "hero",
      dividerStyle: "ornament",
    },
  },
  {
    id: "bistro",
    label: "Bistró",
    description: "Estilo pizarra francesa",
    preview: {
      background: "#1a2e1f",
      primary: "#fef3c7",
      accent: "#fbbf24",
    },
    config: {
      template: "bistro",
      primaryColor: "#fef3c7",
      secondaryColor: "#1a2e1f",
      accentColor: "#fbbf24",
      backgroundColor: "#22382a",
      fontFamily: "lora",
      headingFont: "playfair",
      layout: "list",
      cardStyle: "flat",
      borderRadius: "small",
      spacing: "cozy",
      showImages: false,
      showDescriptions: true,
      priceStyle: "dotted",
      headerStyle: "centered",
      dividerStyle: "dots",
    },
  },
  {
    id: "magazine",
    label: "Editorial",
    description: "Imágenes grandes, estilo revista",
    preview: {
      background: "#ffffff",
      primary: "#000000",
      accent: "#dc2626",
    },
    config: {
      template: "magazine",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      accentColor: "#dc2626",
      backgroundColor: "#ffffff",
      fontFamily: "inter",
      headingFont: "playfair",
      layout: "magazine",
      cardStyle: "flat",
      borderRadius: "none",
      spacing: "comfortable",
      showImages: true,
      showDescriptions: true,
      priceStyle: "bold",
      headerStyle: "hero",
      dividerStyle: "line",
    },
  },
  {
    id: "tropical",
    label: "Tropical",
    description: "Colores vibrantes y formas suaves",
    preview: {
      background: "#fef3c7",
      primary: "#0f5132",
      accent: "#f97316",
    },
    config: {
      template: "tropical",
      primaryColor: "#0f5132",
      secondaryColor: "#fef9e7",
      accentColor: "#f97316",
      backgroundColor: "#ffffff",
      fontFamily: "inter",
      headingFont: "inter",
      layout: "grid",
      cardStyle: "elevated",
      borderRadius: "pill",
      spacing: "cozy",
      showImages: true,
      showDescriptions: true,
      priceStyle: "pill",
      headerStyle: "banner",
      dividerStyle: "dots",
    },
  },
  {
    id: "noir",
    label: "Noir",
    description: "Monocromo dramático y sofisticado",
    preview: {
      background: "#18181b",
      primary: "#fafafa",
      accent: "#fafafa",
    },
    config: {
      template: "noir",
      primaryColor: "#fafafa",
      secondaryColor: "#0a0a0a",
      accentColor: "#a1a1aa",
      backgroundColor: "#18181b",
      fontFamily: "inter",
      headingFont: "inter",
      layout: "list",
      cardStyle: "flat",
      borderRadius: "none",
      spacing: "comfortable",
      showImages: true,
      showDescriptions: true,
      priceStyle: "inline",
      headerStyle: "minimal",
      dividerStyle: "line",
    },
  },
  {
    id: "botanical",
    label: "Botánico",
    description: "Verde natural con toques orgánicos",
    preview: {
      background: "#f0f4ec",
      primary: "#1f3a2c",
      accent: "#7a9b5e",
    },
    config: {
      template: "botanical",
      primaryColor: "#1f3a2c",
      secondaryColor: "#f0f4ec",
      accentColor: "#7a9b5e",
      backgroundColor: "#fafdf6",
      fontFamily: "lora",
      headingFont: "playfair",
      layout: "grid",
      cardStyle: "bordered",
      borderRadius: "large",
      spacing: "cozy",
      showImages: true,
      showDescriptions: true,
      priceStyle: "inline",
      headerStyle: "centered",
      dividerStyle: "ornament",
    },
  },
];

export const FONTS = [
  {
    id: "inter",
    label: "Inter",
    family: "var(--font-plus-jakarta), Inter, sans-serif",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    family: "'Playfair Display', Georgia, serif",
  },
  { id: "lora", label: "Lora", family: "Lora, Georgia, serif" },
  {
    id: "roboto",
    label: "Roboto",
    family: "var(--font-roboto), Roboto, sans-serif",
  },
  { id: "montserrat", label: "Montserrat", family: "Montserrat, sans-serif" },
  {
    id: "merriweather",
    label: "Merriweather",
    family: "Merriweather, Georgia, serif",
  },
  {
    id: "dancing",
    label: "Dancing Script",
    family: "'Dancing Script', cursive",
  },
  {
    id: "bebas",
    label: "Bebas Neue",
    family: "'Bebas Neue', Impact, sans-serif",
  },
];

export const LAYOUTS = [
  { id: "grid", label: "Cuadrícula", description: "Tarjetas en columnas" },
  { id: "list", label: "Lista", description: "Lista vertical clásica" },
  { id: "compact", label: "Compacto", description: "Densidad alta" },
  {
    id: "magazine",
    label: "Editorial",
    description: "Imágenes grandes alternadas",
  },
];

export const CARD_STYLES = [
  { id: "flat", label: "Plano" },
  { id: "elevated", label: "Elevado" },
  { id: "bordered", label: "Bordeado" },
  { id: "glass", label: "Vidrio" },
];

export const BORDER_RADII = [
  { id: "none", label: "Sin borde" },
  { id: "small", label: "Pequeño" },
  { id: "medium", label: "Medio" },
  { id: "large", label: "Grande" },
  { id: "pill", label: "Redondeado" },
];

export const SPACINGS = [
  { id: "compact", label: "Compacto" },
  { id: "cozy", label: "Cómodo" },
  { id: "comfortable", label: "Amplio" },
];

export const PRICE_STYLES = [
  { id: "inline", label: "En línea" },
  { id: "dotted", label: "Puntos" },
  { id: "bold", label: "Negrita" },
  { id: "pill", label: "Píldora" },
];

export const HEADER_STYLES = [
  { id: "centered", label: "Centrado" },
  { id: "hero", label: "Hero" },
  { id: "banner", label: "Banner" },
  { id: "minimal", label: "Minimalista" },
];

export const DIVIDER_STYLES = [
  { id: "none", label: "Ninguno" },
  { id: "line", label: "Línea" },
  { id: "dots", label: "Puntos" },
  { id: "ornament", label: "Ornamento" },
];

export const CURRENCIES = [
  { id: "$", label: "Dólar ($)" },
  { id: "€", label: "Euro (€)" },
  { id: "£", label: "Libra (£)" },
  { id: "¥", label: "Yen (¥)" },
  { id: "S/", label: "Sol (S/)" },
  { id: "MX$", label: "Peso MX (MX$)" },
  { id: "AR$", label: "Peso AR (AR$)" },
  { id: "COP", label: "Peso COL (COP)" },
];

export const RADIUS_VALUES: Record<string, string> = {
  none: "0px",
  small: "6px",
  medium: "12px",
  large: "20px",
  pill: "999px",
};

export const SPACING_VALUES: Record<string, { gap: string; padding: string }> =
  {
    compact: { gap: "0.5rem", padding: "0.75rem" },
    cozy: { gap: "1rem", padding: "1.25rem" },
    comfortable: { gap: "1.5rem", padding: "1.75rem" },
  };

export function getFontFamily(id: string): string {
  const font = FONTS.find((f) => f.id === id);
  return font?.family ?? "var(--font-plus-jakarta), sans-serif";
}

export function getTemplate(id: string): TemplatePreset | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
