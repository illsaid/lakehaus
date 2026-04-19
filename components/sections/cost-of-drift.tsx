export function CostOfDrift() {
  return (
    <section className="py-16 lg:py-24 bg-card-warm border-t border-soft-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-deep-sage mb-3">
            The difference
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
            Scattered advice vs. a structured approach
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-soft-border/30 rounded-sm overflow-hidden">
          <div className="bg-card-warm px-8 py-10">
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-charcoal/30 mb-6">
              What most women are doing
            </p>
            <ul className="space-y-5">
              {[
                'Collecting tips from a dozen different sources that never connect',
                'Spending money on products that address symptoms, not causes',
                'Losing time to advice that was not designed for female biology',
                'Feeling uncertain whether anything is actually working',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[6px] w-1 h-1 rounded-full bg-charcoal/20 shrink-0" />
                  <span className="text-sm text-charcoal/40 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bone px-8 py-10">
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-6">
              What a structured approach looks like
            </p>
            <ul className="space-y-5">
              {[
                'One diagnostic tool to assess what is already changing',
                'One editorial source grounded in evidence, not trends',
                'One implementation guide that connects all six pillars',
                'A clear next step at every stage of the journey',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[6px] w-1 h-1 rounded-full bg-deep-sage shrink-0" />
                  <span className="text-sm text-charcoal/60 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
