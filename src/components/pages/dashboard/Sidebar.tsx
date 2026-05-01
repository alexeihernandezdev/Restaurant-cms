"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  FolderTree,
  Palette,
  Settings,
  LogOut,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface SidebarProps {
  user: {
    name?: string | null;
    email: string;
  };
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/dashboard/dishes", label: "Platos", icon: UtensilsCrossed },
  { href: "/dashboard/categories", label: "Categorías", icon: FolderTree },
  {
    href: "/dashboard/menu-styles",
    label: "Estilos del Menú",
    icon: Palette,
  },
  { href: "/dashboard/settings", label: "Configuración", icon: Settings },
];

function getInitials(name?: string | null, email?: string | null | undefined) {
  const source = name?.trim() || email?.split("@")[0] || "U";
  const parts = source.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
}

export function DashboardSidebar({ user, collapsed: controlledCollapsed, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    const newValue = !collapsed;
    if (isControlled) {
      onCollapsedChange?.(newValue);
    } else {
      setInternalCollapsed(newValue);
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-[var(--border-soft)] bg-surface/80 backdrop-blur-xl transition-all duration-300 ease-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        className="absolute -right-3 top-20 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-soft)] bg-surface shadow-md transition-transform hover:scale-110 active:scale-95"
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-zinc-500" strokeWidth={2.5} />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-zinc-500" strokeWidth={2.5} />
        )}
      </button>

      {/* Brand */}
      <div className={`flex items-center gap-3 px-6 py-6 ${collapsed ? "justify-center px-0" : ""}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
          <ChefHat className="h-5 w-5" strokeWidth={2.25} />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Panel
            </p>
            <h1 className="text-lg font-bold tracking-tight">
              Restaurant<span className="text-gradient-brand">CMS</span>
            </h1>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 space-y-1 overflow-y-auto py-4 ${collapsed ? "px-2" : "px-3"}`}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-zinc-100 text-zinc-500 group-hover:bg-white group-hover:text-primary-600 dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {collapsed && isActive && (
                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-x-1 rounded-r-full bg-white/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className={`border-t border-[var(--border-soft)] p-4 ${collapsed ? "px-2" : ""}`}>
        <div
          className={`mb-3 flex items-center gap-3 rounded-xl bg-zinc-50 p-3 transition-all dark:bg-zinc-800/60 ${collapsed ? "justify-center p-2" : ""}`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-accent text-xs font-bold text-white">
            {getInitials(user.name, user.email)}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user.name || "Usuario"}
              </p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          title={collapsed ? "Cerrar Sesión" : undefined}
          className={`group flex items-center justify-center gap-2 rounded-xl border border-[var(--border-soft)] bg-transparent px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:text-zinc-300 dark:hover:border-rose-900/40 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 ${collapsed ? "px-2" : ""}`}
        >
          <LogOut
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={2.25}
          />
          {!collapsed && <span className="whitespace-nowrap">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}