import { prisma } from "@lib/prisma";

export async function getMenuStyle(tenantId: string) {
  return prisma.menuStyle.findUnique({
    where: { tenantId },
  });
}

export async function createMenuStyle(tenantId: string) {
  return prisma.menuStyle.create({
    data: { tenantId },
  });
}

export async function updateMenuStyle(
  id: string,
  tenantId: string,
  data: Record<string, unknown>,
) {
  return prisma.menuStyle.update({
    where: { id, tenantId },
    data,
  });
}

export async function getMenuStyleById(id: string, tenantId: string) {
  return prisma.menuStyle.findFirst({ where: { id, tenantId } });
}