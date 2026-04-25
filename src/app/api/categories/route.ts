import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";

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

    const maxOrder = await prisma.category.aggregate({
      where: { tenantId },
      _max: { order: true },
    });

    const category = await prisma.category.create({
      data: {
        name,
        description,
        order: (maxOrder._max.order || 0) + 1,
        tenantId,
      },
    });

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

    const categories = await prisma.category.findMany({
      where: { tenantId },
      include: { _count: { select: { dishes: true } } },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
