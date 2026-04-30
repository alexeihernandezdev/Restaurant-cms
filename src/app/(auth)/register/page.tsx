"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowRight, Building2, Globe, Lock, Mail, User } from "lucide-react";
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
    <div className="w-full max-w-md animate-fade-up">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-surface/80 p-8 shadow-elevated backdrop-blur-xl sm:p-10">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-brand"
        />

        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            Empieza gratis
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Crear <span className="text-gradient-brand">Cuenta</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Regístrate para gestionar tu restaurante
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
              <User className="h-3.5 w-3.5" />
              Tu Nombre
            </label>
            <RHFInput
              type="text"
              register={register}
              name="name"
              placeholder="Juan Pérez"
              isRequired
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Building2 className="h-3.5 w-3.5" />
              Nombre del Restaurante
            </label>
            <RHFInput
              type="text"
              register={register}
              name="restaurantName"
              placeholder="La Buena Mesa"
              isRequired
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <Globe className="h-3.5 w-3.5" />
              Subdominio (URL)
            </label>
            <RHFInput
              type="text"
              register={register}
              name="slug"
              placeholder="la-buena-mesa"
              isRequired
              onChange={(e) => handleSlugChange(e.target.value)}
            />
          </div>

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
            {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            {!isSubmitting && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
          >
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
