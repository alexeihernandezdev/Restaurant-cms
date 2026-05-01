import { auth } from "@lib/auth";
import { getDishCount, getCategoryCount, getTenant } from "@lib/db";
import { DashboardCards } from "@components/organisms/DashboardCards";
import { PageHeader } from "@components/molecules";
import { LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;
  const userName = session?.user?.name?.split(" ")[0];

  const [tenant, dishCount, categoryCount] = await Promise.all([
    getTenant(tenantId || ""),
    getDishCount(tenantId || ""),
    getCategoryCount(tenantId || ""),
  ]);

  console.log(tenant);

  return (
    <div>
      <PageHeader
        eyebrow="Inicio"
        title={userName ? `Hola, ${userName}` : "Bienvenido"}
        description="Resumen rápido de tu restaurante y accesos directos."
        icon={LayoutDashboard}
      />
      <DashboardCards
        dishCount={dishCount}
        categoryCount={categoryCount}
        menuVisits={0}
        tenantSlug={tenant?.id}
      />
    </div>
  );
}
