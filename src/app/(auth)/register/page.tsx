"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@lib/api/auth";
import { RHFInput } from "@components/atoms/renderFields";

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

          <RHFInput
            type="text"
            register={register}
            name="name"
            placeholder="Tu Nombre"
            isRequired
          />

          <RHFInput
            type="text"
            register={register}
            name="restaurantName"
            placeholder="Nombre del Restaurante"
            isRequired
          />

          <RHFInput
            type="text"
            register={register}
            name="slug"
            placeholder="Subdominio (URL)"
            isRequired
            onChange={(e) => handleSlugChange(e.target.value)}
          />

          <RHFInput
            type="email"
            register={register}
            name="email"
            placeholder="Email"
            isRequired
          />

          <RHFInput
            type="password"
            register={register}
            name="password"
            placeholder="Contraseña"
            isRequired
          />

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
