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

const outcomes = [
  'Which changes may be signaling something deeper',
  'What patterns to watch over the coming weeks',
  'When it may be worth going further with the full guide',
];

export function SkinAuditFeature() {
  return (
    <section className="py-20 lg:py-28 bg-card-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-deep-sage mb-4">
          Start here
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal leading-tight">
          Score what your skin is already telling you
        </h2>
        <p className="mt-6 text-base text-charcoal/50 leading-relaxed max-w-2xl mx-auto">
          Most women notice changes&nbsp;&mdash; firmness, dryness, pigmentation, texture&nbsp;&mdash; before anyone explains what they may mean. The 6-Marker Skin Audit gives you a fast, structured way to assess six visible signals and understand what may be shifting underneath.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl mx-auto text-left">
          <div className="sm:col-span-2">
            <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-charcoal/35 mb-4">
              What you will score
            </p>
          </div>
          {markers.map((marker) => (
            <div key={marker} className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-deep-sage shrink-0" />
              <span className="text-sm text-charcoal/60 leading-relaxed">
                {marker}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-2xl mx-auto text-left">
          <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-charcoal/35 mb-4">
            What you will understand after
          </p>
          <div className="space-y-3">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-muted-rose shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal/60 leading-relaxed">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/free-skin-audit"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-charcoal text-bone rounded text-sm tracking-wide hover:bg-charcoal/90 transition-colors duration-200"
          >
            Get the Free Skin Audit
          </Link>
          <p className="mt-3 text-xs text-charcoal/35 tracking-wide">
            Free. Takes 2 minutes. Delivered when you join Younger, Longer Weekly.
          </p>
        </div>
      </div>
    </section>
  );
}
