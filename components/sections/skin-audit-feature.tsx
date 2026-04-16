import Link from 'next/link';
import { CircleCheck as CheckCircle } from 'lucide-react';

const markers = [
  'Skin density and bounce',
  'Slower wound healing',
  'Moisture retention',
  'Texture and resting lines',
  'Hair thickness and texture',
  'Hyperpigmentation persistence',
];

export function SkinAuditFeature() {
  return (
    <section className="py-20 lg:py-28 bg-card-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-deep-sage mb-4">
          Start here
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal leading-tight">
          A free skin audit for the first visible signs of hormonal change
        </h2>
        <p className="mt-6 text-base text-charcoal/50 leading-relaxed max-w-2xl mx-auto">
          Many women notice skin changes before they get clear answers. This quick
          audit helps you score what you are actually seeing and understand what
          may be shifting underneath.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
          {markers.map((marker) => (
            <div key={marker} className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-deep-sage shrink-0" />
              <span className="text-sm text-charcoal/60 leading-relaxed">
                {marker}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/free-skin-audit"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors duration-200"
          >
            Send Me the Audit
          </Link>
          <p className="mt-3 text-xs text-charcoal/35 tracking-wide">
            Delivered instantly when you join Younger, Longer Weekly.
          </p>
        </div>
      </div>
    </section>
  );
}
