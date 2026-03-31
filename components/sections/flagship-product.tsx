import Link from 'next/link';
import { CircleCheck as CheckCircle } from 'lucide-react';

const benefits = [
  'Evidence-based protocols for skin, strength, and metabolic health',
  'Practical daily routines you can implement immediately',
  'Hormonal health guidance for perimenopause and beyond',
  'Curated supplement and product recommendations',
  'Clear, accessible language with zero medical jargon',
];

export function FlagshipProduct() {
  return (
    <section className="py-20 lg:py-28 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="bg-oat rounded-2xl aspect-[3/4] flex items-center justify-center overflow-hidden order-1 lg:order-none">
            <div className="text-center p-12">
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-deep-sage mb-6">
                The Guide
              </p>
              <h3 className="font-serif text-4xl lg:text-5xl font-light text-charcoal leading-tight">
                Younger,
                <br />
                Longer
              </h3>
              <div className="mt-6 w-12 h-px bg-soft-border mx-auto" />
              <p className="mt-6 text-sm text-charcoal/40">
                by LAKEHAUS Health
              </p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-muted-rose mb-4">
              Flagship Guide
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight">
              The complete guide to aging well &mdash; from the inside out
            </h2>
            <p className="mt-6 text-base text-charcoal/50 leading-relaxed">
              A comprehensive, beautifully designed digital guide covering
              everything modern women need to know about longevity, vitality, and
              looking their best at every age.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-4.5 h-4.5 text-deep-sage shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal/60 leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/younger-longer"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors duration-200"
              >
                Learn More
              </Link>
              <Link
                href="/free-chapter"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors duration-200"
              >
                Read a Free Chapter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
