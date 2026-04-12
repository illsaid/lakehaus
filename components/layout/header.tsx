'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-charcoal focus:text-bone focus:rounded focus:text-sm"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 bg-bone/95 backdrop-blur-sm border-b border-soft-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/"
              className="font-serif text-xl lg:text-2xl font-semibold text-charcoal tracking-tight"
            >
              LAKEHAUS
            </Link>

            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-charcoal/60 hover:text-charcoal transition-colors duration-200 tracking-wide uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link
                href="/free-chapter"
                className="text-sm px-5 py-2.5 bg-charcoal text-bone rounded hover:bg-charcoal/90 transition-colors duration-200 tracking-wide"
              >
                Get the Free Chapter
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-charcoal -mr-2"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-soft-border bg-bone animate-fade-up" aria-label="Mobile navigation">
            <div className="px-4 py-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base text-charcoal/70 hover:text-charcoal py-3 border-b border-soft-border/40 last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/free-chapter"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center text-sm px-5 py-3 bg-charcoal text-bone rounded hover:bg-charcoal/90 transition-colors"
                >
                  Get the Free Chapter
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
