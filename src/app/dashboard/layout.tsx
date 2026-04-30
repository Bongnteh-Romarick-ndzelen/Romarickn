
'use client'
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto pt-16 md:pl-64">{children}</main>
      </div>
    </>
  );
}
