"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RHFInput } from "@components/atoms/renderFields";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Credenciales inválidas");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          <p className="text-zinc-500 mt-2">
            Accede a tu cuenta de RestaurantCMS
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.root && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
              {errors.root.message}
            </div>
          )}

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
            {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-zinc-500">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-primary-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
