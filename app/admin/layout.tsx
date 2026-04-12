'use client';

import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ErrorBoundary } from '@/components/error-boundary';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-bone overflow-auto">
          <div className="p-6 lg:p-8">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
