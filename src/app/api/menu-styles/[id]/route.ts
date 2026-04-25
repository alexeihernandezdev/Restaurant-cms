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

    const existing = await prisma.menuStyle.findFirst({
      where: { id, tenantId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Estilo no encontrado" },
        { status: 404 },
      );
    }

    const { template, primaryColor, secondaryColor, accentColor, fontFamily } =
      await req.json();

    const menuStyle = await prisma.menuStyle.update({
      where: { id },
      data: {
        ...(template && { template }),
        ...(primaryColor && { primaryColor }),
        ...(secondaryColor && { secondaryColor }),
        ...(accentColor && { accentColor }),
        ...(fontFamily && { fontFamily }),
      },
    });

    return NextResponse.json(menuStyle);
  } catch (error) {
    console.error("Error updating menu style:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
