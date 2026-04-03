import Image from 'next/image';
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
    <section className="relative overflow-hidden bg-bone min-h-[600px] lg:min-h-[680px]">
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/Gemini_Generated_Image_q5rkz4q5rkz4q5rka.png"
          alt=""
          fill
          priority
          className="object-cover object-[75%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #F6F0E8 38%, #F6F0E8cc 52%, #F6F0E880 65%, transparent 85%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative z-10">
        <div className="max-w-xl">
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
    </section>
  );
}
