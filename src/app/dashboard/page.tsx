import { auth } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { DashboardCards } from "@components/organisms/DashboardCards";

export default async function DashboardPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  const [dishCount, categoryCount] = await Promise.all([
    prisma.dish.count({ where: { tenantId: tenantId || "" } }),
    prisma.category.count({ where: { tenantId: tenantId || "" } }),
  ]);

  return (
    <div>
      <DashboardCards dishCount={dishCount} categoryCount={categoryCount} menuVisits={0} />
    </div>
  );
}
