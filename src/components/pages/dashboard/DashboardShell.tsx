"use client";

import { useState } from "react";
import { DashboardSidebar } from "@components/pages/dashboard/Sidebar";

interface DashboardShellProps {
  user: {
    name?: string | null;
    email: string;
  };
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Background mesh - absolute to cover parent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-mesh"
      />

      {/* Sidebar with controlled collapse state */}
      <DashboardSidebar
        user={user}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      {/* Main content with dynamic margin */}
      <main
        className={`flex-1 px-6 py-8 sm:px-10 sm:py-10 transition-all duration-300 ease-out ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl animate-fade-up">
          {children}
        </div>
      </main>
    </div>
  );
}