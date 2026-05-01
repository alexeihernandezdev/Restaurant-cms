import { fetcher } from "../utils/fetcher";

export interface MenuStyleInput {
  template?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  headingFont?: string;
  layout?: string;
  cardStyle?: string;
  borderRadius?: string;
  spacing?: string;
  showImages?: boolean;
  showDescriptions?: boolean;
  priceStyle?: string;
  headerStyle?: string;
  dividerStyle?: string;
  currency?: string;
  tagline?: string | null;
}

export async function updateMenuStyle(id: string, data: MenuStyleInput) {
  return fetcher(`/api/menu-styles/${id}`, { method: "PUT", body: data });
}
