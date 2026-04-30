"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail } from "lucide-react";
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
    <div className="w-full max-w-md animate-fade-up">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-surface/80 p-8 shadow-elevated backdrop-blur-xl sm:p-10">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-brand"
        />

        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            Bienvenido de vuelta
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Iniciar <span className="text-gradient-brand">Sesión</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Accede a tu panel de RestaurantCMS
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.root && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
              <span>{errors.root.message}</span>
            </div>
          )}

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Mail className="h-3.5 w-3.5" />
              Email
            </label>
            <RHFInput
              type="email"
              register={register}
              name="email"
              placeholder="tu@email.com"
              isRequired
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Lock className="h-3.5 w-3.5" />
              Contraseña
            </label>
            <RHFInput
              type="password"
              register={register}
              name="password"
              placeholder="••••••••"
              isRequired
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
            {!isSubmitting && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
