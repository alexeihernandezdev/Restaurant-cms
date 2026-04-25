import { prisma } from "./prisma";
import { headers } from "next/headers";

export async function getTenantFromRequest() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const pathname = headersList.get("x pathname") || "";

  let slug: string | null = null;
  let subdomain: string | null = null;

  // Extract subdomain
  const hostParts = host.split(".");
  if (hostParts.length > 2) {
    subdomain = hostParts[0];
  }

  // Extract slug from path (for path-based multi-tenancy)
  const pathMatch = pathname.match(/^\/([a-z0-9-]+)$/);
  if (pathMatch && !subdomain) {
    slug = pathMatch[1];
  }

  // Query tenant
  const tenant = await prisma.tenant.findFirst({
    where: {
      OR: [{ slug: slug || "" }, { subdomain: subdomain || "" }],
    },
  });

  return tenant;
}

export async function getTenantBySlug(slug: string) {
  return prisma.tenant.findUnique({
    where: { slug },
    include: {
      menuStyle: true,
      categories: {
        include: {
          dishes: {
            where: { available: true },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });
}
