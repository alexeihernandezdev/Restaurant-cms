import { prisma } from "@lib/prisma";

export async function getDishes(tenantId: string, categoryId?: string) {
  return prisma.dish.findMany({
    where: {
      tenantId,
      ...(categoryId && { categoryId }),
    },
    include: { category: true },
    orderBy: { order: "asc" },
  });
}

export async function createDish(
  data: {
    name: string;
    description?: string | null;
    price: number;
    categoryId: string;
    imageUrl?: string | null;
    available?: boolean;
  },
  tenantId: string,
) {
  return prisma.dish.create({
    data: {
      ...data,
      tenantId,
    },
  });
}

export async function updateDish(
  id: string,
  tenantId: string,
  data: {
    name?: string;
    description?: string | null;
    price?: number;
    categoryId?: string;
    imageUrl?: string | null;
    available?: boolean;
  },
) {
  return prisma.dish.update({
    where: { id, tenantId },
    data,
  });
}

export async function deleteDish(id: string, tenantId: string) {
  return prisma.dish.delete({ where: { id, tenantId } });
}

export async function getDishById(id: string, tenantId: string) {
  return prisma.dish.findFirst({ where: { id, tenantId } });
}

export async function getDishCount(tenantId: string) {
  return prisma.dish.count({ where: { tenantId } });
}