interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base text-charcoal/50 leading-relaxed ${
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-lg'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
