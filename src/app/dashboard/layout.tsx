import { redirect } from "next/navigation";
import { auth } from "@lib/auth";
import { DashboardSidebar } from "@components/pages/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="relative flex min-h-screen bg-background">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-mesh"
      />
      <DashboardSidebar user={session.user} />
      <main className="ml-64 flex-1 px-6 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto w-full max-w-7xl animate-fade-up">
          {children}
        </div>
      </main>
    </div>
  );
}
