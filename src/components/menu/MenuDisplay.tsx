import { MenuStyle } from "../../types";

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
      }}
    >
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8 text-center">
          {tenant.logoUrl && (
            <img
              src={tenant.logoUrl}
              alt={tenant.name}
              className="w-24 h-24 mx-auto mb-4 object-contain"
            />
          )}
          <h1
            className="text-4xl font-bold"
            style={{ color: style.primaryColor }}
          >
            {tenant.name}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {tenant.categories.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            Este restaurante aún no tiene platos en su menú.
          </div>
        ) : (
          <div className="space-y-16">
            {tenant.categories.map((category) => (
              <section key={category.id}>
                <div className="mb-8 text-center">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ color: style.primaryColor }}
                  >
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-zinc-500">{category.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      {dish.imageUrl && (
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3
                            className="text-xl font-semibold"
                            style={{ color: style.primaryColor }}
                          >
                            {dish.name}
                          </h3>
                          <span
                            className="text-lg font-bold"
                            style={{ color: style.accentColor }}
                          >
                            ${Number(dish.price).toFixed(2)}
                          </span>
                        </div>
                        {dish.description && (
                          <p className="text-zinc-500 text-sm">
                            {dish.description}
                          </p>
                        )}
                        {!dish.available && (
                          <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                            No disponible
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 text-center text-zinc-500 text-sm">
        <p>Menú digital de {tenant.name}</p>
      </footer>
    </div>
  );
}
