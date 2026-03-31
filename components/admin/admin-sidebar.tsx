'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import {
  FileText,
  Star,
  Tag,
  Mail,
  Settings,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Articles', href: '/admin/articles', icon: FileText },
  { label: 'Recommended', href: '/admin/recommended', icon: Star },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  return (
    <aside className="w-60 bg-charcoal min-h-screen flex flex-col">
      <div className="p-5 border-b border-bone/10">
        <Link
          href="/admin"
          className="font-serif text-lg font-semibold text-bone tracking-tight"
        >
          LAKEHAUS
        </Link>
        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-bone/30 mt-0.5">
          Admin
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-bone/10 text-bone'
                  : 'text-bone/40 hover:text-bone/70 hover:bg-bone/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-bone/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded text-sm text-bone/30 hover:text-bone/60 transition-colors mb-1"
        >
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded text-sm text-bone/30 hover:text-bone/60 transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
