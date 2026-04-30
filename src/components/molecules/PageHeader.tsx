import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  actions,
}: PageHeaderProps) {
  return (
    <div className="relative mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh opacity-70"
      />

      <div className="relative flex items-start gap-4">
        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
            <Icon className="h-5 w-5" strokeWidth={2.25} />
          </div>
        )}
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="relative flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
