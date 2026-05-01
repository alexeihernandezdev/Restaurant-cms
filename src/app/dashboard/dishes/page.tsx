import { auth } from "@lib/auth";
import { getDishes, getCategories } from "@lib/db";
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
    getCategories(tenantId),
    getDishes(tenantId),
  ]);

  const dishesForClient = dishes.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    price: Number(d.price),
    imageUrl: d.imageUrl,
    available: d.available,
    order: d.order,
    categoryId: d.categoryId,
    tenantId: d.tenantId,
  }));

  const categoriesForClient = categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return (
    <div>
      <PageHeader
        eyebrow="Menú"
        title="Platos"
        description="Gestiona los platillos de tu carta. Organízalos, edita precios y mucho más."
        icon={UtensilsCrossed}
        actions={<DishModal categories={categoriesForClient} />}
      />

      <div className="rounded-2xl border border-[var(--border-soft)] bg-surface shadow-soft">
        <DishesTable dishes={dishesForClient} categories={categoriesForClient} />
      </div>
    </div>
  );
}
