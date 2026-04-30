import type { MenuStyle } from "../../../types";

interface MenuDisplayProps {
  tenant: {
    name: string;
    slug: string;
    logoUrl: string | null;
    menuStyle: MenuStyle | null;
    categories: {
      id: string;
      name: string;
      description: string | null;
      dishes: {
        id: string;
        name: string;
        description: string | null;
        price: number | { toString: () => string };
        imageUrl: string | null;
        available: boolean;
      }[];
    }[];
  };
}

export function MenuDisplay({ tenant }: MenuDisplayProps) {
  const style = tenant.menuStyle || {
    template: "classic",
    primaryColor: "#1a1a1a",
    secondaryColor: "#f5f5f5",
    accentColor: "#d4a574",
    fontFamily: "inter",
    logoUrl: null,
    coverImageUrl: null,
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: style.secondaryColor,
        fontFamily: style.fontFamily,
        color: style.primaryColor,
      }}
    >
      <header
        className="relative overflow-hidden border-b"
        style={{ borderColor: `${style.primaryColor}15` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 20% 0%, ${style.accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 100%, ${style.accentColor} 0%, transparent 50%)`,
          }}
        />
        <div className="relative container mx-auto px-6 py-12 text-center sm:py-16">
          {tenant.logoUrl && (
            <img
              src={tenant.logoUrl}
              alt={tenant.name}
              className="mx-auto mb-6 h-24 w-24 object-contain"
            />
          )}
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${style.accentColor}30`,
              color: style.primaryColor,
            }}
          >
            Carta digital
          </span>
          <h1
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: style.primaryColor }}
          >
            {tenant.name}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {tenant.categories.length === 0 ? (
          <div
            className="rounded-2xl border-2 border-dashed py-16 text-center"
            style={{
              borderColor: `${style.primaryColor}25`,
              color: `${style.primaryColor}80`,
            }}
          >
            Este restaurante aún no tiene platos en su menú.
          </div>
        ) : (
          <div className="space-y-16">
            {tenant.categories.map((category) => (
              <section key={category.id}>
                <div className="mb-8 flex flex-col items-center text-center">
                  <div
                    className="mb-3 h-px w-12"
                    style={{ backgroundColor: `${style.accentColor}80` }}
                  />
                  <h2
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: style.primaryColor }}
                  >
                    {category.name}
                  </h2>
                  {category.description && (
                    <p
                      className="mt-2 max-w-xl text-sm"
                      style={{ color: `${style.primaryColor}99` }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.dishes.map((dish) => (
                    <article
                      key={dish.id}
                      className="group overflow-hidden rounded-2xl bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      {dish.imageUrl ? (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {!dish.available && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-sm">
                              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-rose-600">
                                No disponible
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className="flex h-32 items-center justify-center text-3xl font-bold opacity-15"
                          style={{
                            backgroundColor: `${style.accentColor}30`,
                            color: style.primaryColor,
                          }}
                        >
                          {dish.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="p-6">
                        <div className="mb-2 flex items-baseline justify-between gap-3">
                          <h3
                            className="text-lg font-semibold tracking-tight"
                            style={{ color: style.primaryColor }}
                          >
                            {dish.name}
                          </h3>
                          <span
                            className="shrink-0 text-lg font-bold"
                            style={{ color: style.accentColor }}
                          >
                            ${Number(dish.price).toFixed(2)}
                          </span>
                        </div>
                        {dish.description && (
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: `${style.primaryColor}99` }}
                          >
                            {dish.description}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer
        className="mt-16 border-t py-8 text-center text-sm"
        style={{
          borderColor: `${style.primaryColor}15`,
          color: `${style.primaryColor}80`,
        }}
      >
        <p>Menú digital de {tenant.name}</p>
      </footer>
    </div>
  );
}
