import Link from "next/link";
import {
  ChefHat,
  UtensilsCrossed,
  Palette,
  QrCode,
  ArrowRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { auth } from "@lib/auth";
import { getTenant } from "@lib/db";
import { MenuQRCard } from "@components/pages/menu/MenuQRCard";

export default async function LandingPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;
  const [tenant] = await Promise.all([
    getTenant(tenantId || ""),
  ]);
  const tenantSlug = tenant?.slug;
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary-300/40 blur-3xl animate-blob" />
        <div
          className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-accent-300/40 blur-3xl animate-blob"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl animate-blob"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[var(--border-soft)] glass">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
              <ChefHat className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Restaurant<span className="text-gradient-brand">CMS</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Empezar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-surface/70 px-3 py-1 text-xs font-semibold text-primary-600 shadow-soft backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Menús digitales modernos para restaurantes
            </span>
            <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
              Tu carta digital,{" "}
              <span className="text-gradient-brand">irresistible</span> y
              siempre lista.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-zinc-600 dark:text-zinc-300">
              Crea menús preciosos, personaliza colores y tipografías, y
              comparte tu carta con un código QR — todo desde un panel hecho
              para sentirse genial.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Comenzar Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-surface/70 px-7 py-3.5 text-base font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface"
              >
                Ya tengo cuenta
              </Link>
            </div>

            {/* Floating preview */}
            <div className="relative mt-16 mx-auto max-w-3xl">
              <div className="rounded-3xl border border-[var(--border-soft)] bg-surface/90 p-2 shadow-elevated backdrop-blur">
                <div className="rounded-2xl bg-gradient-to-br from-primary-50 via-accent-50 to-amber-50 dark:from-primary-950/40 dark:via-accent-900/30 dark:to-amber-950/30 p-8">
                  <div className="grid grid-cols-3 gap-4 text-left">
                    {[
                      {
                        label: "Platos",
                        value: "48",
                        accent: "from-rose-500 to-orange-500",
                      },
                      {
                        label: "Categorías",
                        value: "12",
                        accent: "from-violet-500 to-fuchsia-500",
                      },
                      {
                        label: "Visitas",
                        value: "1.2k",
                        accent: "from-amber-500 to-rose-500",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-[var(--border-soft)] bg-surface/95 p-4 shadow-soft"
                      >
                        <div
                          className={`mb-2 h-1 w-8 rounded-full bg-gradient-to-r ${stat.accent}`}
                        />
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {tenantSlug && (
          <section className="relative px-6 pb-12">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Tu Menú Digital
                </h2>
                <p className="mt-1 text-zinc-600 dark:text-zinc-300">
                  Accede a tu carta digital y compártela con tus clientes
                </p>
              </div>
              <MenuQRCard tenantSlug={tenantSlug} />
            </div>
          </section>
        )}

        {/* Features */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
                Todo lo que necesitas
              </p>
              <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                Diseñado para enamorar a tus clientes
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: UtensilsCrossed,
                  title: "Gestión de Platos",
                  description:
                    "Crea y organiza tu menú con categorías, imágenes, precios y descripciones — sin complicaciones.",
                  gradient: "from-rose-500 to-orange-500",
                },
                {
                  icon: Palette,
                  title: "100% Personalizable",
                  description:
                    "Elige plantillas, colores y tipografías que reflejen la identidad de tu restaurante.",
                  gradient: "from-violet-500 to-fuchsia-500",
                },
                {
                  icon: QrCode,
                  title: "Menú QR Instantáneo",
                  description:
                    "Genera códigos QR automáticamente para que tus clientes accedan al menú al instante.",
                  gradient: "from-amber-500 to-rose-500",
                },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="group relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
                  >
                    <div
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                    />
                    <div
                      className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-soft`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Multi-tenant CTA */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-gradient-brand p-10 text-center text-white shadow-elevated sm:p-16">
              <div
                aria-hidden
                className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/20 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
              />
              <div className="relative">
                <Building2 className="mx-auto mb-5 h-10 w-10 opacity-90" />
                <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Multitenant. Pensado para crecer contigo.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-white/90 sm:text-lg">
                  Cada restaurante tiene su propio espacio, menú y estilo. Ideal
                  para cadenas o grupos hosteleros que quieren mantener todo
                  bajo control.
                </p>
                <Link
                  href="/register"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary-600 shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Crea tu cuenta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-soft)] px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <p>© 2026 RestaurantCMS. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            Hecho con
            <span className="text-gradient-brand font-semibold">cariño</span>
            para restaurantes.
          </p>
        </div>
      </footer>
    </div>
  );
}
