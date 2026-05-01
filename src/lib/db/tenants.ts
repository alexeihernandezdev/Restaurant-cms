import { prisma } from "@lib/prisma";

export async function getTenant(id: string) {
  return prisma.tenant.findUnique({
    where: { id },
  });
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

export async function getTenantFromRequest(request: {
  host: string | null;
  pathname: string | null;
}) {
  let slug: string | null = null;
  let subdomain: string | null = null;

  const hostParts = request.host?.split(".") ?? [];
  if (hostParts.length > 2) {
    subdomain = hostParts[0];
  }

  const pathMatch = request.pathname?.match(/^\/([a-z0-9-]+)$/);
  if (pathMatch && !subdomain) {
    slug = pathMatch[1];
  }

  return prisma.tenant.findFirst({
    where: {
      OR: [{ slug: slug || "" }, { subdomain: subdomain || "" }],
    },
  });
}

export async function tenantExistsBySlug(slug: string) {
  return prisma.tenant.findUnique({ where: { slug } });
}