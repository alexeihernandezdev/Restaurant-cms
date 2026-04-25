import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import { MenuStylesEditor } from "@components/menu-styles/MenuStylesEditor";

export default async function MenuStylesPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const menuStyle = await prisma.menuStyle.findUnique({
    where: { tenantId },
  });

  if (!menuStyle) {
    const newStyle = await prisma.menuStyle.create({
      data: { tenantId },
    });
    return <MenuStylesEditor menuStyle={newStyle} />;
  }

  return <MenuStylesEditor menuStyle={menuStyle} />;
}
