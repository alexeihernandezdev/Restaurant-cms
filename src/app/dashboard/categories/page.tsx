import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import { CategoriesList } from "@components/pages/categories/CategoriesList";
import { CategoryModal } from "@components/pages/categories/CategoryModal";

export default async function CategoriesPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const categories = await prisma.category.findMany({
    where: { tenantId },
    include: {
      _count: {
        select: { dishes: true },
      },
    },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <CategoryModal />
      </div>

      <CategoriesList categories={categories} />
    </div>
  );
}
