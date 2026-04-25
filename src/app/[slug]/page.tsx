import { notFound } from "next/navigation";
import { getTenantBySlug } from "@lib/tenant";
import { MenuDisplay } from "@components/menu/MenuDisplay";
import { QRCodeGenerator } from "@components/menu/QRCodeGenerator";

interface MenuPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { slug } = await params;
  const tenant = await getTenantBySlug(slug);

  if (!tenant) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <MenuDisplay tenant={tenant} />
      <div className="fixed bottom-6 right-6">
        <QRCodeGenerator tenantSlug={slug} />
      </div>
    </div>
  );
}
