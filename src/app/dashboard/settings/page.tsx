import { auth } from "@lib/auth";
import { prisma } from "@lib/prisma";
import { redirect } from "next/navigation";
import { Settings, Building2, Globe, KeyRound } from "lucide-react";
import { PageHeader } from "@components/molecules";

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
      <PageHeader
        eyebrow="Cuenta"
        title="Configuración"
        description="Gestiona la información de tu restaurante y tu cuenta."
        icon={Settings}
      />

      <div className="grid max-w-3xl gap-5">
        <section className="rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-soft">
              <Building2 className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Información del Restaurante
              </h2>
              <p className="text-xs text-zinc-500">
                Datos generales de tu negocio
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border-soft)] bg-surface-muted/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Nombre
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {tenant.name}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border-soft)] bg-surface-muted/40 p-4">
              <div className="flex items-center gap-1.5">
                <Globe className="h-3 w-3 text-zinc-500" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Subdominio
                </p>
              </div>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                /{tenant.slug}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Para cambiar el nombre o subdominio, contacta a soporte.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-accent text-white shadow-soft">
              <KeyRound className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Cambiar Contraseña
              </h2>
              <p className="text-xs text-zinc-500">
                Actualiza tu credencial de acceso
              </p>
            </div>
          </div>

          <p className="mb-4 text-sm text-zinc-500">
            La funcionalidad de cambio de contraseña estará disponible pronto.
          </p>
          <button
            className="cursor-not-allowed rounded-xl border border-[var(--border-soft)] bg-surface-muted px-4 py-2 text-sm font-medium text-zinc-400"
            disabled
          >
            Cambiar Contraseña
          </button>
        </section>
      </div>
    </div>
  );
}
