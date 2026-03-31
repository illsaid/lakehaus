import Link from 'next/link';

interface HeroProps {
  headline: string;
  subheadline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
}

export function Hero({
  headline,
  subheadline,
  description,
  primaryCtaText,
  primaryCtaUrl,
  secondaryCtaText,
  secondaryCtaUrl,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl relative z-10">
          <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-deep-sage mb-6">
            {subheadline}
          </p>
          <h1 className="font-serif text-[2.75rem] sm:text-6xl lg:text-7xl font-light text-charcoal leading-[1.08] tracking-tight">
            {headline}
          </h1>
          <p className="mt-6 text-lg text-charcoal/50 leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href={primaryCtaUrl}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors duration-200"
            >
              {primaryCtaText}
            </Link>
            <Link
              href={secondaryCtaUrl}
              className="inline-flex items-center justify-center px-7 py-3.5 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors duration-200"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 w-2/5 h-full pointer-events-none hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-l from-oat/60 to-transparent" />
        <div className="absolute bottom-0 right-12 w-64 h-80 bg-sage/10 rounded-t-full" />
        <div className="absolute top-20 right-40 w-32 h-32 bg-muted-rose/8 rounded-full" />
      </div>
    </section>
  );
}
