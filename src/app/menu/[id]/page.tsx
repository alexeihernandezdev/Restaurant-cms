import { notFound } from "next/navigation";
import { getTenantById } from "@lib/db/tenants";
import { MenuDisplay } from "@components/pages/menu/MenuDisplay";
import { QRCodeGenerator } from "@components/pages/menu/QRCodeGenerator";

interface MenuPageProps {
  params: Promise<{ id: string }>;
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { id } = await params;
  const tenant = await getTenantById(id);

  if (!tenant) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <MenuDisplay tenant={tenant} />
      <div className="fixed bottom-6 right-6">
        <QRCodeGenerator tenantSlug={tenant.slug} />
      </div>
    </div>
  );
}
