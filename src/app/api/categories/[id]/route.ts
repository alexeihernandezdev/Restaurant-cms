import { NextRequest, NextResponse } from "next/server";
import { auth } from "@lib/auth";
import {
  updateCategory,
  deleteCategory,
  getCategoryById,
} from "@lib/db/categories";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const tenantId = session?.user?.tenantId;
    const { id } = await params;

    if (!tenantId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const existing = await getCategoryById(id, tenantId);

    if (!existing) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 },
      );
    }

    const { name, description } = await req.json();

    const category = await updateCategory(
      id,
      tenantId,
      { name, description },
    );

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const tenantId = session?.user?.tenantId;
    const { id } = await params;

    if (!tenantId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const existing = await getCategoryById(id, tenantId);

    if (!existing) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 },
      );
    }

    await deleteCategory(id, tenantId);

    return NextResponse.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
