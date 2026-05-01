import { NextRequest, NextResponse } from "next/server";
import { auth } from "@lib/auth";
import { createCategory, getCategories } from "@lib/db/categories";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const tenantId = session?.user?.tenantId;

    if (!tenantId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 },
      );
    }

    const category = await createCategory({ name, description }, tenantId);

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const tenantId = session?.user?.tenantId;

    if (!tenantId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const categories = await getCategories(tenantId);

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
