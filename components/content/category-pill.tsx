'use client';

import Link from 'next/link';

interface CategoryPillProps {
  name: string;
  slug: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export function CategoryPill({
  name,
  active,
  href,
  onClick,
}: CategoryPillProps) {
  const className = `inline-block text-[11px] font-sans uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
    active
      ? 'bg-charcoal text-bone border-charcoal'
      : 'bg-transparent text-charcoal/50 border-soft-border hover:border-charcoal/30 hover:text-charcoal'
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {name}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {name}
    </button>
  );
}
