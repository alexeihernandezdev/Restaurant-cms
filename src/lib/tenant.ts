import { getTenantBySlug as _getTenantBySlug, getTenantFromRequest as _getTenantFromRequest } from "./db/tenants";

export async function getTenantBySlug(slug: string) {
  return _getTenantBySlug(slug);
}

export async function getTenantFromRequestHeaders() {
  const headersList = await import("next/headers").then((m) => m.headers());
  const host = headersList.get("host") || "";
  const pathname = headersList.get("x-pathname") || "";

  return _getTenantFromRequest({ host, pathname });
}