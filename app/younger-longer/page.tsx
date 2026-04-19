import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EmailCapture } from '@/components/sections/email-capture';
import { CircleCheck as CheckCircle, BookOpen, Shield, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { YOUNGER_LONGER_CHECKOUT_URL, SITE_URL } from '@/lib/constants';
import { guideProductJsonLd, faqPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

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

const forItems = [
  'Women in their 30s, 40s, 50s, and beyond who want a clear, evidence-grounded map to aging well',
  'Women experiencing early signs of hormonal transition who want to understand what is shifting and why',
  'Anyone who has followed wellness trends but wants a more rigorous, science-aware foundation',
  'Women who want practical protocols, not just information — something they can actually implement',
  'Readers of LAKEHAUS Health who want to go deeper than the free editorial content',
];

const notForItems = [
  'People seeking a clinical medical program or a replacement for professional healthcare',
  'Those looking for a quick fix or a single supplement solution',
  'Men (the guide is specifically researched and written for female biology)',
];

const faqs = [
  {
    question: 'What is Younger, Longer?',
    answer:
      'Younger, Longer is an 8-chapter digital guide to healthy aging for women, produced by the LAKEHAUS Health editorial team. It covers the six core pillars of longevity — skin, strength, metabolism, sleep, hormones, and energy — plus a complete implementation protocol. The guide is designed to give women a clear, evidence-grounded framework for aging well.',
  },
  {
    question: 'What format does the guide come in?',
    answer:
      'Younger, Longer is a digital guide delivered as a PDF. It is available for instant download after purchase.',
  },
  {
    question: 'How many chapters does it include?',
    answer:
      'The guide includes eight chapters: The New Science of Aging Well; Skin Longevity: What Actually Works; Building Strength for Decades; Metabolic Health and Body Composition; Sleep as a Longevity Practice; Hormonal Health Through Transition; Energy, Stress, and Recovery; and The LAKEHAUS Protocol: Putting It All Together.',
  },
  {
    question: 'How is this different from the free content on LAKEHAUS Health?',
    answer:
      'The free editorial content on LAKEHAUS Health covers individual topics in depth. Younger, Longer brings all six pillars together in one structured framework with specific, interconnected protocols — it is a complete system rather than a collection of individual articles. It also includes the LAKEHAUS Protocol chapter, which is exclusive to the guide.',
  },
  {
    question: 'Is this a subscription or a one-time purchase?',
    answer:
      'Younger, Longer is a one-time purchase. You pay once and own the guide permanently. It is separate from the Younger, Longer Weekly newsletter, which is a free email subscription.',
  },
  {
    question: 'Can I read a chapter before buying?',
    answer:
      'Yes. Chapter 4 — Skin, Collagen & Cosmetic Longevity — is available as a free preview when you join the Younger, Longer Weekly newsletter. You can access it at lakehaushealth.com/free-chapter.',
  },
];

export default function YoungerLongerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideProductJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: SITE_URL },
              { name: 'Younger, Longer', url: `${SITE_URL}/younger-longer` },
            ])
          ),
        }}
      />
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
                <p className="mt-5 text-base text-charcoal/50 leading-relaxed max-w-lg">
                  An 8-chapter digital guide covering the full landscape of healthy aging for women&nbsp;&mdash; skin, strength, metabolism, sleep, hormones, energy, and a complete implementation protocol. Written by the LAKEHAUS Health editorial team. One-time purchase, instant delivery.
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
                    href="/free-chapter"
                    className="inline-flex items-center justify-center px-7 py-3.5 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors"
                  >
                    Read a Free Chapter
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

        <section className="bg-bone py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-4">
                  Who This Is For
                </p>
                <ul className="space-y-4">
                  {forItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/60 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-charcoal/30 mb-4">
                  Who This Is Not For
                </p>
                <ul className="space-y-4">
                  {notForItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-charcoal/25 shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/40 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="chapters" className="bg-card-warm py-16 lg:py-24">
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
                href="/free-chapter"
                className="inline-flex items-center justify-center px-8 py-4 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors"
              >
                Read a Free Chapter
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-bone py-16 lg:py-24">
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
                href="/free-chapter"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-charcoal/20 text-charcoal rounded text-sm tracking-wide hover:border-charcoal/40 transition-colors"
              >
                Read a Free Chapter
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-card-warm py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
                Common Questions
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
                Frequently asked
              </h2>
            </div>
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`py-7 ${index < faqs.length - 1 ? 'border-b border-soft-border/40' : ''}`}
                >
                  <h3 className="font-serif text-lg font-medium text-charcoal mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-charcoal/50 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
