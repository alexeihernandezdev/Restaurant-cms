import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";
import { DishesTable } from "@components/pages/dishes/DishesTable";
import { DishModal } from "@components/pages/dishes/DishModal";
import { PageHeader } from "@components/molecules";

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
      <PageHeader
        eyebrow="Menú"
        title="Platos"
        description="Gestiona los platillos de tu carta. Organízalos, edita precios y mucho más."
        icon={UtensilsCrossed}
        actions={<DishModal categories={categories} />}
      />

      <div className="rounded-2xl border border-[var(--border-soft)] bg-surface shadow-soft">
        <DishesTable dishes={dishes as any} categories={categories} />
      </div>
    </div>
  );
}
