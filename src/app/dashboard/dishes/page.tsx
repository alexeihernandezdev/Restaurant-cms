import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import { DishesTable } from "@components/dishes/DishesTable";
import { DishModal } from "@components/dishes/DishModal";

export default async function DishesPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const [categories, dishes] = await Promise.all([
    prisma.category.findMany({
      where: { tenantId },
      orderBy: { order: "asc" },
    }),
    prisma.dish.findMany({
      where: { tenantId },
      include: { category: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Platos</h1>
        <DishModal categories={categories} />
      </div>

      <DishesTable dishes={dishes as any} categories={categories} />
    </div>
  );
}
