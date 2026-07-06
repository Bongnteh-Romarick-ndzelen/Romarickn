// app/admin/layout.tsx
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminHeader } from "@/components/dashboard/header";
import { AdminSidebar } from "@/components/dashboard/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="h-screen flex flex-col bg-slate-50/50 overflow-hidden">
        <AdminHeader />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto bg-slate-50/50">
            <div className="p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}