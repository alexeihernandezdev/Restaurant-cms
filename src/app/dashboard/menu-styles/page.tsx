import { auth } from "@lib/auth";
import { getMenuStyle, createMenuStyle } from "@lib/db";
import { redirect } from "next/navigation";
import { MenuStylesEditor } from "@components/pages/menu-styles/MenuStylesEditor";

export default async function MenuStylesPage() {
  const session = await auth();
  const tenantId = session?.user?.tenantId;

  if (!tenantId) {
    redirect("/login");
  }

  const menuStyle = await getMenuStyle(tenantId);

  if (!menuStyle) {
    const newStyle = await createMenuStyle(tenantId);
    return <MenuStylesEditor menuStyle={newStyle} />;
  }

  return <MenuStylesEditor menuStyle={menuStyle} />;
}
