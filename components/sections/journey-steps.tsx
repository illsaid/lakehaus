import Link from 'next/link';

const steps = [
  {
    number: '01',
    label: 'Notice what is changing',
    description:
      'The free Skin Audit helps you score six visible markers that most women notice before they get clear answers.',
    cta: 'Start the Audit',
    href: '/free-skin-audit',
  },
  {
    number: '02',
    label: 'Read the free chapter',
    description:
      'Chapter 4 of Younger, Longer — Skin, Collagen & Cosmetic Longevity — gives you the evidence-aware science behind what you scored.',
    cta: 'Read a Free Chapter',
    href: '/free-chapter',
  },
  {
    number: '03',
    label: 'Get the full framework',
    description:
      'Younger, Longer is the 8-chapter guide that connects all six pillars into one structured, evidence-aware protocol.',
    cta: 'Explore the Guide',
    href: '/younger-longer',
  },
];

export function JourneySteps() {
  return (
    <section className="py-16 lg:py-20 bg-bone border-t border-soft-border/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-deep-sage mb-3">
            How it works
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
            A clear path, not a library
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 relative">
          <div className="hidden md:block absolute top-[1.75rem] left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-px bg-soft-border/50" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center px-6 pb-10 md:pb-0">
              <div className="relative z-10 w-14 h-14 rounded-full border border-soft-border/60 bg-bone flex items-center justify-center mb-5 shrink-0">
                <span className="text-xs font-mono text-deep-sage tracking-widest">{step.number}</span>
              </div>
              <h3 className="font-serif text-lg font-light text-charcoal mb-3 leading-snug">
                {step.label}
              </h3>
              <p className="text-sm text-charcoal/45 leading-relaxed mb-5 max-w-[220px]">
                {step.description}
              </p>
              <Link
                href={step.href}
                className="text-xs font-sans uppercase tracking-[0.2em] text-charcoal/50 hover:text-charcoal transition-colors duration-200 border-b border-charcoal/20 hover:border-charcoal/50 pb-0.5"
              >
                {step.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
