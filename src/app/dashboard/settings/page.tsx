import { auth } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@heroui/react";

export default async function SettingsPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Configuración</h1>

      <div className="max-w-2xl space-y-6">
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Información del Restaurante
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-500">Nombre</label>
                <p className="font-medium">{tenant.name}</p>
              </div>
              <div>
                <label className="text-sm text-zinc-500">Subdominio</label>
                <p className="font-medium">{tenant.slug}</p>
              </div>
              <p className="text-sm text-zinc-500">
                Para cambiar el nombre o subdominio, contacta a soporte.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Cambiar Contraseña</h2>
            <p className="text-sm text-zinc-500 mb-4">
              La funcionalidad de cambio de contraseña estará disponible pronto.
            </p>
            <button
              className="px-4 py-2 border border-zinc-300 rounded-md text-zinc-400 cursor-not-allowed"
              disabled
            >
              Cambiar Contraseña
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
