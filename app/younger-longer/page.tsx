import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCapture } from '@/components/sections/email-capture';
import { CircleCheck as CheckCircle, BookOpen, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { YOUNGER_LONGER_CHECKOUT_URL, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Younger, Longer \u2014 The Complete Guide to Aging Well',
  description:
    'A comprehensive digital guide covering everything modern women need to know about longevity, vitality, skin health, strength, and metabolic wellness.',
  alternates: {
    canonical: `${SITE_URL}/younger-longer`,
  },
};

const chapters = [
  'The New Science of Aging Well',
  'Skin Longevity: What Actually Works',
  'Building Strength for Decades',
  'Metabolic Health and Body Composition',
  'Sleep as a Longevity Practice',
  'Hormonal Health Through Transition',
  'Energy, Stress, and Recovery',
  'The LAKEHAUS Protocol: Putting It All Together',
];

const benefits = [
  {
    icon: BookOpen,
    title: '8 Evidence-Based Chapters',
    description:
      'Covering skin, strength, metabolism, sleep, hormones, energy, and a complete implementation protocol.',
  },
  {
    icon: Shield,
    title: 'Research-Backed Guidance',
    description:
      'Every recommendation is grounded in peer-reviewed science, not trends or influencer opinion.',
  },
  {
    icon: Sparkles,
    title: 'Practical Protocols',
    description:
      'Actionable daily, weekly, and seasonal routines you can start implementing immediately.',
  },
];

export default function YoungerLongerPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-bone pt-16 pb-12 lg:pt-28 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-muted-rose mb-4">
                  The LAKEHAUS Guide
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-[1.1]">
                  Younger, Longer
                </h1>
                <p className="mt-2 font-serif text-xl text-charcoal/40 font-light">
                  The complete guide to aging well
                </p>
                <p className="mt-6 text-base text-charcoal/50 leading-relaxed max-w-lg">
                  Everything modern women need to know about longevity, vitality,
                  and feeling their best at every age &mdash; in one beautifully
                  designed, evidence-based digital guide.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={YOUNGER_LONGER_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors"
                  >
                    Get the Full Guide
                  </a>
                  <Link
                    href="/free-skin-audit"
                    className="inline-flex items-center justify-center px-7 py-3.5 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors"
                  >
                    Get the Free Skin Audit
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl aspect-[3/4] overflow-hidden relative shadow-xl">
                <Image
                  src="/Gemini_Generated_Image_nwlvjvnwlvjvnwlv.png"
                  alt="Younger, Longer — A Practical Guide to Younger-Looking Skin and Healthy Aging"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card-warm py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5">
                    <benefit.icon className="w-5 h-5 text-deep-sage" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-charcoal/40 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="chapters" className="bg-bone py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
                Inside the Guide
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
                Eight chapters of clarity
              </h2>
            </div>
            <div className="space-y-0">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter}
                  className="flex items-center gap-6 py-5 border-b border-soft-border/40"
                >
                  <span className="text-sm text-charcoal/20 font-mono w-8 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-lg text-charcoal">
                    {chapter}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={YOUNGER_LONGER_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors"
              >
                Get the Full Guide
              </a>
              <Link
                href="/free-skin-audit"
                className="inline-flex items-center justify-center px-8 py-4 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors"
              >
                Get the Free Skin Audit
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-card-warm py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight">
              Not another wellness book full of vague promises
            </h2>
            <p className="mt-6 text-base text-charcoal/50 leading-relaxed">
              Younger, Longer is built on the same editorial principles as
              LAKEHAUS Health: clear language, credible science, practical
              protocols, and zero hype. Every recommendation is specific,
              actionable, and backed by evidence.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={YOUNGER_LONGER_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors"
              >
                Get the Full Guide
              </a>
              <Link
                href="/free-skin-audit"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors"
              >
                Get the Free Skin Audit
              </Link>
            </div>
          </div>
        </section>

        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
