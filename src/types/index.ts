export interface Tenant {
  id: string;
  name: string;
  slug: string;
  subdomain: string | null;
  logoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  order: number;
  tenantId: string;
  dishes: Dish[];
}

export interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  available: boolean;
  order: number;
  categoryId: string;
  tenantId: string;
}

export interface MenuStyle {
  id: string;
  tenantId: string;
  template: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string | null;
  coverImageUrl: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  tenantId: string;
}
