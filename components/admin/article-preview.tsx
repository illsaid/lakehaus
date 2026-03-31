'use client';

import Image from 'next/image';

interface ArticlePreviewProps {
  title: string;
  deck: string;
  body: string;
  hero_image_url: string;
  hero_image_alt: string;
  reading_time: number;
  categoryName?: string;
}

export function ArticlePreview({
  title,
  deck,
  body,
  hero_image_url,
  hero_image_alt,
  reading_time,
  categoryName,
}: ArticlePreviewProps) {
  return (
    <div className="bg-bone rounded-lg border border-soft-border/60 overflow-hidden">
      <div className="px-4 py-3 bg-oat border-b border-soft-border/40 flex items-center justify-between">
        <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/40">
          Preview
        </span>
        <span className="text-[11px] text-charcoal/30">
          Public article view
        </span>
      </div>

      <div className="max-h-[80vh] overflow-y-auto">
        <header className="bg-bone pt-8 pb-6 px-6">
          {categoryName && (
            <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-deep-sage mb-3">
              {categoryName}
            </p>
          )}
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-charcoal leading-[1.15]">
            {title || <span className="text-charcoal/20">Untitled article</span>}
          </h1>
          {deck && (
            <p className="mt-3 text-base text-charcoal/50 leading-relaxed">
              {deck}
            </p>
          )}
          {reading_time > 0 && (
            <p className="mt-3 text-sm text-charcoal/30">{reading_time} min read</p>
          )}
        </header>

        {hero_image_url && (
          <div className="px-6 pb-6">
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg bg-oat">
              <Image
                src={hero_image_url}
                alt={hero_image_alt || title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="px-6 pb-8">
          {body ? (
            <div
              className="prose-editorial"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : (
            <p className="text-sm text-charcoal/20 italic">
              No body content yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
