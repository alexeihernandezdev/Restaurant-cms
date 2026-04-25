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

    const {
      name,
      description,
      price,
      categoryId,
      imageUrl,
      available = true,
    } = await req.json();

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 },
      );
    }

    const dish = await prisma.dish.create({
      data: {
        name,
        description,
        price,
        categoryId,
        imageUrl,
        available,
        tenantId,
      },
    });

    return NextResponse.json(dish, { status: 201 });
  } catch (error) {
    console.error("Error creating dish:", error);
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

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const dishes = await prisma.dish.findMany({
      where: {
        tenantId,
        ...(categoryId && { categoryId }),
      },
      include: { category: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
