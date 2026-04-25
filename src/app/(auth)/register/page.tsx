"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@lib/api/auth";

interface RegisterForm {
  name: string;
  restaurantName: string;
  slug: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const handleSlugChange = (value: string) => {
    const slugValue = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
    setValue("slug", slugValue);
  };

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data);
      router.push("/login?registered=true");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Crear Cuenta</h1>
          <p className="text-zinc-500 mt-2">
            Regístrate para gestionar tu restaurante
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.root && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
              {errors.root.message}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Tu Nombre
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Nombre requerido" })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="restaurantName"
              className="block text-sm font-medium mb-2"
            >
              Nombre del Restaurante
            </label>
            <input
              id="restaurantName"
              type="text"
              {...register("restaurantName", {
                required: "Nombre del restaurante requerido",
              })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800"
            />
            {errors.restaurantName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.restaurantName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-2">
              Subdominio (URL)
            </label>
            <div className="flex items-center">
              <input
                id="slug"
                type="text"
                {...register("slug", { required: "Subdominio requerido" })}
                onChange={(e) => handleSlugChange(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-l-md dark:bg-zinc-800"
                placeholder="mi-restaurante"
              />
              <span className="px-3 py-2 border border-l-0 border-zinc-300 dark:border-zinc-700 rounded-r-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-sm">
                .restaurant.com
              </span>
            </div>
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email requerido" })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Contraseña requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-800"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Cargando..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-zinc-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-primary-500 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
