import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">RestaurantCMS</div>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="px-4 py-2 border border-zinc-300 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Iniciar Sesión
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                Registrarse
              </button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold mb-6">
              Gestiona tu restaurante con facilidad
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Crea menús digitales, personaliza estilos y permite que tus
              clientes escaneen con QR para ver tu carta.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register">
                <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg">
                  Comenzar Gratis
                </button>
              </Link>
              <Link href="/demo">
                <button className="px-6 py-3 border border-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-lg">
                  Ver Demo
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Características
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2">
                  Gestión de Platos
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Crea y organiza tu menú con categorías, imágenes, precios y
                  descripciones.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">
                  Menús Personalizables
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Elige plantillas y personaliza colores y fuentes para reflejan
                  la identidad de tu restaurante.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Menú QR</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Genera códigos QR automáticamente para que tus clientes
                  accedan al menú digital.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Multinquilino</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Cada restaurante tiene su propio espacio, menús y estilos.
              Perfecto para cadenas o grupos hosteleros.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-6">
        <div className="container mx-auto text-center text-zinc-500">
          © 2026 RestaurantCMS. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
