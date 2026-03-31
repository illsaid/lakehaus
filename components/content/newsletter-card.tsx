import { NewsletterIssue } from '@/lib/supabase/types';

interface NewsletterCardProps {
  issue: NewsletterIssue;
}

export function NewsletterCard({ issue }: NewsletterCardProps) {
  const date = issue.issue_date
    ? new Date(issue.issue_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="bg-card-warm rounded-lg border border-soft-border/60 p-6 hover:shadow-sm transition-all duration-300">
      <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-deep-sage mb-2">
        {date}
      </p>
      <h3 className="font-serif text-xl font-medium text-charcoal leading-snug">
        {issue.title}
      </h3>
      <p className="mt-2 text-sm text-charcoal/50 leading-relaxed">
        {issue.summary}
      </p>
    </div>
  );
}
