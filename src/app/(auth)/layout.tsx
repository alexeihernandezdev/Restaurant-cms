import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-300/40 blur-3xl animate-blob" />
        <div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-300/40 blur-3xl animate-blob"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <header className="px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
            <ChefHat className="h-4.5 w-4.5" strokeWidth={2.25} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Restaurant<span className="text-gradient-brand">CMS</span>
          </span>
        </Link>
      </header>

      <main className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-6 pb-12">
        {children}
      </main>
    </div>
  );
}
