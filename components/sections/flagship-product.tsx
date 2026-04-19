import Link from 'next/link';
import Image from 'next/image';
import { CircleCheck as CheckCircle } from 'lucide-react';
import { YOUNGER_LONGER_CHECKOUT_URL } from '@/lib/constants';

const benefits = [
  'Eight chapters covering skin, strength, metabolism, sleep, hormones, and energy',
  'Practical daily, weekly, and seasonal protocols',
  'Research-backed recommendations with zero hype',
  'Designed specifically for female biology and midlife experience — not repurposed men\'s-health advice',
];

export function FlagshipProduct() {
  return (
    <section className="py-20 lg:py-28 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="rounded-2xl aspect-[3/4] overflow-hidden order-1 lg:order-none relative shadow-xl">
            <Image
              src="/Gemini_Generated_Image_nwlvjvnwlvjvnwlv.png"
              alt="Younger, Longer — A Practical Guide to Younger-Looking Skin and Healthy Aging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-muted-rose mb-4">
              When you are ready for the full picture
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight">
              The audit shows you where to look. The guide gives you what to do about it.
            </h2>
            <p className="mt-6 text-base text-charcoal/50 leading-relaxed">
              If the Skin Audit tells you something is changing, Younger, Longer
              gives you the practical next layer: skin, hormones, metabolism,
              muscle, sleep, and the interventions worth understanding.
            </p>
            <p className="mt-4 text-base text-charcoal/50 leading-relaxed">
              Most women spend months collecting fragments&nbsp;&mdash; a podcast here, an article there, a supplement someone recommended. Younger, Longer replaces that with one coherent, evidence-aware framework.
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
              <a
                href={YOUNGER_LONGER_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors duration-200"
              >
                Explore the Guide
              </a>
              <Link
                href="/free-skin-audit"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors duration-200"
              >
                Prefer to start free? Get the Skin Audit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
