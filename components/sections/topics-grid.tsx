import { Sparkles, Dumbbell, Zap, Moon, Flame, Heart, Video as LucideIcon } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Dumbbell,
  Zap,
  Moon,
  Flame,
  Heart,
};

interface Topic {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface TopicsGridProps {
  topics: Topic[];
}

export function TopicsGrid({ topics }: TopicsGridProps) {
  return (
    <section className="py-20 lg:py-28 bg-card-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-deep-sage mb-3">
            What We Cover
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
            Six pillars of aging well
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {topics.map((topic) => {
            const Icon = iconMap[topic.icon] || Sparkles;
            return (
              <Link
                key={topic.slug}
                href={`/articles?category=${topic.slug}`}
                className="group bg-bone rounded-lg border border-soft-border/60 p-6 lg:p-8 hover:shadow-sm hover:border-sage/40 transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-deep-sage mb-4 group-hover:text-sage transition-colors duration-200" />
                <h3 className="font-serif text-lg lg:text-xl font-medium text-charcoal mb-2">
                  {topic.name}
                </h3>
                <p className="text-sm text-charcoal/40 leading-relaxed">
                  {topic.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
