import { NextRequest, NextResponse } from "next/server";
import { userExistsByEmail, createUserWithTenant } from "@lib/db/users";
import { tenantExistsBySlug as checkTenant } from "@lib/db/tenants";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { name, restaurantName, slug, email, password } = await req.json();

    if (!name || !restaurantName || !slug || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 },
      );
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          error:
            "El slug solo puede contener letras minúsculas, números y guiones",
        },
        { status: 400 },
      );
    }

    const existingTenant = await checkTenant(slug);

    if (existingTenant) {
      return NextResponse.json(
        { error: "Este subdominio ya está en uso" },
        { status: 400 },
      );
    }

    const existingUser = await userExistsByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUserWithTenant({
      name,
      restaurantName,
      slug,
      email,
      password,
    });

    return NextResponse.json(
      { message: "Cuenta creada exitosamente", tenant: result },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
