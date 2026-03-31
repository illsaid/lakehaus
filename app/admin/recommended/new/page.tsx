'use client';

import { RecommendedForm } from '@/components/admin/recommended-form';

export default function NewRecommendedPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        New Recommendation
      </h1>
      <RecommendedForm />
    </div>
  );
}
