import { auth } from "@lib/auth";
import { getDishCount, getCategoryCount } from "@lib/db";
import { DashboardCards } from "@components/organisms/DashboardCards";
import { PageHeader } from "@components/molecules";
import { LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;
  const userName = session?.user?.name?.split(" ")[0];

  const [dishCount, categoryCount] = await Promise.all([
    getDishCount(tenantId || ""),
    getCategoryCount(tenantId || ""),
  ]);

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
      />
    </div>
  );
}
