"use client";

import {
  UtensilsCrossed,
  FolderTree,
  Eye,
  ArrowRight,
  Plus,
  FolderPlus,
  Palette,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  gradient: string;
  trend?: string;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  gradient,
  trend,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`}
      />
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-soft`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </div>
        {trend && (
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            {trend}
          </span>
        )}
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </p>
      <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {description && (
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      )}
    </div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
}

function QuickAction({
  title,
  description,
  icon: Icon,
  href,
  gradient,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-soft transition-transform group-hover:scale-110`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold tracking-tight">{title}</p>
        <p className="truncate text-xs text-zinc-500">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
    </Link>
  );
}

interface DashboardCardsProps {
  dishCount: number;
  categoryCount: number;
  menuVisits?: number;
  tenantSlug?: string;
}

export function DashboardCards({
  dishCount,
  categoryCount,
  menuVisits = 0,
  tenantSlug,
}: DashboardCardsProps) {
  return (
    <div className="space-y-10">
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Estadísticas
            </h2>
            <p className="text-sm text-zinc-500">Resumen rápido de tu menú</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            title="Total de Platos"
            value={dishCount}
            description="Platos en tu menú"
            icon={UtensilsCrossed}
            gradient="from-rose-500 to-orange-500"
          />
          <StatCard
            title="Categorías"
            value={categoryCount}
            description="Categorías activas"
            icon={FolderTree}
            gradient="from-violet-500 to-fuchsia-500"
          />
          <StatCard
            title="Visitas al Menú"
            value={menuVisits}
            description="Veces que han visto tu carta"
            icon={Eye}
            gradient="from-amber-500 to-rose-500"
          />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Acciones Rápidas
          </h2>
          <p className="text-sm text-zinc-500">
            Salta directo a lo que necesitas
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            title="Agregar Plato"
            description="Nuevo platillo a tu menú"
            icon={Plus}
            href="/dashboard/dishes"
            gradient="from-rose-500 to-orange-500"
          />
          <QuickAction
            title="Crear Categoría"
            description="Organiza tu menú"
            icon={FolderPlus}
            href="/dashboard/categories"
            gradient="from-violet-500 to-fuchsia-500"
          />
          <QuickAction
            title="Configurar Estilos"
            description="Personaliza tu menú"
            icon={Palette}
            href="/dashboard/menu-styles"
            gradient="from-amber-500 to-rose-500"
          />
          <QuickAction
            title="Ver Menú"
            description="Vista previa pública"
            icon={Eye}
            href={tenantSlug ? `/menu/${tenantSlug}` : "/menu"}
            gradient="from-emerald-500 to-teal-500"
          />
        </div>
      </section>
    </div>
  );
}
