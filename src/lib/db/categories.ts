import { prisma } from "@lib/prisma";

export async function getCategories(tenantId: string) {
  return prisma.category.findMany({
    where: { tenantId },
    include: { _count: { select: { dishes: true } } },
    orderBy: { order: "asc" },
  });
}

export async function createCategory(
  data: { name: string; description?: string | null },
  tenantId: string,
) {
  const maxOrder = await prisma.category.aggregate({
    where: { tenantId },
    _max: { order: true },
  });

  return prisma.category.create({
    data: {
      ...data,
      order: (maxOrder._max.order || 0) + 1,
      tenantId,
    },
  });
}

export async function updateCategory(
  id: string,
  tenantId: string,
  data: { name?: string; description?: string | null },
) {
  return prisma.category.update({
    where: { id, tenantId },
    data,
  });
}

export async function deleteCategory(id: string, tenantId: string) {
  return prisma.category.delete({ where: { id, tenantId } });
}

export async function getCategoryById(id: string, tenantId: string) {
  return prisma.category.findFirst({ where: { id, tenantId } });
}

export async function getCategoryCount(tenantId: string) {
  return prisma.category.count({ where: { tenantId } });
}