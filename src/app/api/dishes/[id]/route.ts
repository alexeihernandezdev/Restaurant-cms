import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";

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

    const existing = await prisma.dish.findFirst({
      where: { id, tenantId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Plato no encontrado" },
        { status: 404 },
      );
    }

    const { name, description, price, categoryId, imageUrl, available } =
      await req.json();

    const dish = await prisma.dish.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price && { price }),
        ...(categoryId && { categoryId }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(available !== undefined && { available }),
      },
    });

    return NextResponse.json(dish);
  } catch (error) {
    console.error("Error updating dish:", error);
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

    const existing = await prisma.dish.findFirst({
      where: { id, tenantId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Plato no encontrado" },
        { status: 404 },
      );
    }

    await prisma.dish.delete({ where: { id } });

    return NextResponse.json({ message: "Plato eliminado" });
  } catch (error) {
    console.error("Error deleting dish:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
