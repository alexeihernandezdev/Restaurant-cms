import { auth } from "@lib/auth";
import { getCategories } from "@lib/db";
import { redirect } from "next/navigation";
import { FolderTree } from "lucide-react";
import { CategoriesList } from "@components/pages/categories/CategoriesList";
import { CategoryModal } from "@components/pages/categories/CategoryModal";
import { PageHeader } from "@components/molecules";

export default async function CategoriesPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const categories = await getCategories(tenantId);

  return (
    <div>
      <PageHeader
        eyebrow="Menú"
        title="Categorías"
        description="Agrupa tus platos en secciones para que tu menú sea fácil de leer."
        icon={FolderTree}
        actions={<CategoryModal />}
      />

      <CategoriesList categories={categories} />
    </div>
  );
}
