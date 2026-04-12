import Link from 'next/link';
import { NAV_ITEMS, BRAND } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-charcoal text-bone/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl font-semibold text-bone tracking-tight"
            >
              LAKEHAUS
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-bone/50 max-w-md">
              {BRAND.description}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-bone/30 mb-5">
              Navigate
            </h4>
            <nav className="space-y-3" aria-label="Footer navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-bone/50 hover:text-bone transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-bone/30 mb-5">
              Company
            </h4>
            <nav className="space-y-3" aria-label="Company links">
              <Link
                href="/how-we-review"
                className="block text-sm text-bone/50 hover:text-bone transition-colors duration-200"
              >
                How We Review
              </Link>
              <Link
                href="/about"
                className="block text-sm text-bone/50 hover:text-bone transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/free-chapter"
                className="block text-sm text-bone/50 hover:text-bone transition-colors duration-200"
              >
                Free Chapter
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bone/10">
          <p className="text-xs text-bone/30 leading-relaxed max-w-3xl">
            &copy; {new Date().getFullYear()} LAKEHAUS Health. All rights
            reserved. Editorial content is for informational purposes only and
            does not constitute medical advice. Some links on this site are
            affiliate links. We may earn a small commission at no additional cost
            to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
