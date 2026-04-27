"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {
  user: {
    name?: string | null;
    email: string;
  };
}

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Inicio" },
    { href: "/dashboard/dishes", label: "Platos" },
    { href: "/dashboard/categories", label: "Categorías" },
    { href: "/dashboard/menu-styles", label: "Estilos del Menú" },
    { href: "/dashboard/settings", label: "Configuración" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white dark:bg-zinc-900 p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold">RestaurantCMS</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md transition-colors relative ${
                isActive
                  ? "bg-primary-100 text-primary-600 dark:bg-primary-900/30"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
        <div className="mb-4">
          <p className="text-sm font-medium truncate">
            {user.name || "Usuario"}
          </p>
          <p className="text-xs text-zinc-500 truncate">{user.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
