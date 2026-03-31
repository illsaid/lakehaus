'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { FileText, Star, Mail, Users } from 'lucide-react';

interface Counts {
  articles: number;
  recommended: number;
  newsletter: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({
    articles: 0,
    recommended: 0,
    newsletter: 0,
    subscribers: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [a, r, n, s] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase
          .from('recommended_items')
          .select('id', { count: 'exact', head: true }),
        supabase
          .from('newsletter_issues')
          .select('id', { count: 'exact', head: true }),
        supabase
          .from('newsletter_subscribers')
          .select('id', { count: 'exact', head: true }),
      ]);
      setCounts({
        articles: a.count || 0,
        recommended: r.count || 0,
        newsletter: n.count || 0,
        subscribers: s.count || 0,
      });
    };
    fetchCounts();
  }, []);

  const cards = [
    {
      label: 'Articles',
      count: counts.articles,
      icon: FileText,
      href: '/admin/articles',
    },
    {
      label: 'Recommendations',
      count: counts.recommended,
      icon: Star,
      href: '/admin/recommended',
    },
    {
      label: 'Newsletter Issues',
      count: counts.newsletter,
      icon: Mail,
      href: '/admin/newsletter',
    },
    {
      label: 'Subscribers',
      count: counts.subscribers,
      icon: Users,
      href: '#',
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-card-warm rounded-lg border border-soft-border/60 p-6 hover:shadow-sm transition-all"
          >
            <card.icon className="w-5 h-5 text-charcoal/30 mb-3" />
            <p className="font-serif text-3xl font-light text-charcoal">
              {card.count}
            </p>
            <p className="text-sm text-charcoal/40 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/articles/new"
          className="bg-charcoal text-bone rounded-lg p-6 hover:bg-charcoal/90 transition-colors"
        >
          <FileText className="w-5 h-5 mb-3 text-bone/50" />
          <p className="font-serif text-lg">New Article</p>
          <p className="text-sm text-bone/40 mt-1">
            Create a new editorial article
          </p>
        </Link>
        <Link
          href="/admin/recommended/new"
          className="bg-charcoal text-bone rounded-lg p-6 hover:bg-charcoal/90 transition-colors"
        >
          <Star className="w-5 h-5 mb-3 text-bone/50" />
          <p className="font-serif text-lg">New Recommendation</p>
          <p className="text-sm text-bone/40 mt-1">
            Add a curated product recommendation
          </p>
        </Link>
      </div>
    </div>
  );
}
