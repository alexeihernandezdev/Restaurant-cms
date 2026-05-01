import { NextRequest, NextResponse } from "next/server";
import { auth } from "@lib/auth";
import { getMenuStyleById, updateMenuStyle } from "@lib/db/menuStyles";

const STRING_FIELDS = [
  "template",
  "primaryColor",
  "secondaryColor",
  "accentColor",
  "backgroundColor",
  "fontFamily",
  "headingFont",
  "layout",
  "cardStyle",
  "borderRadius",
  "spacing",
  "priceStyle",
  "headerStyle",
  "dividerStyle",
  "currency",
] as const;

const BOOLEAN_FIELDS = ["showImages", "showDescriptions"] as const;

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

    const existing = await getMenuStyleById(id, tenantId);

    if (!existing) {
      return NextResponse.json(
        { error: "Estilo no encontrado" },
        { status: 404 },
      );
    }

    const body = (await req.json()) as Record<string, unknown>;

    const data: Record<string, unknown> = {};

    for (const field of STRING_FIELDS) {
      const value = body[field];
      if (typeof value === "string" && value.length > 0) {
        data[field] = value;
      }
    }

    for (const field of BOOLEAN_FIELDS) {
      const value = body[field];
      if (typeof value === "boolean") {
        data[field] = value;
      }
    }

    if ("tagline" in body) {
      const value = body.tagline;
      data.tagline =
        typeof value === "string" && value.trim().length > 0
          ? value.trim()
          : null;
    }

    const menuStyle = await updateMenuStyle(id, tenantId, data);

    return NextResponse.json(menuStyle);
  } catch (error) {
    console.error("Error updating menu style:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
