import { auth } from "@lib/auth";
import { prisma } from "@lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  const [dishCount, categoryCount] = await Promise.all([
    prisma.dish.count({ where: { tenantId: tenantId || "" } }),
    prisma.category.count({ where: { tenantId: tenantId || "" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <p className="text-sm text-zinc-500 mb-2">Total de Platos</p>
          <p className="text-4xl font-bold">{dishCount}</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <p className="text-sm text-zinc-500 mb-2">Categorías</p>
          <p className="text-4xl font-bold">{categoryCount}</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <p className="text-sm text-zinc-500 mb-2">Visitas al Menú</p>
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
