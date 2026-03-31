import { Shield, BookOpen, Search, Users } from 'lucide-react';
import Link from 'next/link';

const principles = [
  {
    icon: Search,
    title: 'Research-First',
    description:
      'Every recommendation and claim is grounded in peer-reviewed research and credible sources.',
  },
  {
    icon: Shield,
    title: 'Editorially Independent',
    description:
      'Our editorial decisions are never influenced by affiliate partnerships or brand relationships.',
  },
  {
    icon: BookOpen,
    title: 'Clear, Not Clinical',
    description:
      'We translate complex health science into accessible guidance without dumbing it down.',
  },
  {
    icon: Users,
    title: 'Women-First Lens',
    description:
      'Our content is specifically researched and written for women navigating midlife health.',
  },
];

export function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
            Our Approach
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
            Why you can trust us
          </h2>
          <p className="mt-4 text-base text-charcoal/40 max-w-2xl mx-auto leading-relaxed">
            We believe wellness guidance should be intelligent, honest, and free
            from hype. Here is how we operate.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {principles.map((principle) => (
            <div key={principle.title} className="text-center">
              <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5">
                <principle.icon className="w-5 h-5 text-deep-sage" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-charcoal/40 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/how-we-review"
            className="text-sm text-charcoal/50 hover:text-charcoal border-b border-charcoal/15 hover:border-charcoal/30 pb-0.5 transition-colors duration-200"
          >
            Read our full editorial standards
          </Link>
        </div>
      </div>
    </section>
  );
}
