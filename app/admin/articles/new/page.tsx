'use client';

import { ArticleForm } from '@/components/admin/article-form';

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        New Article
      </h1>
      <ArticleForm />
    </div>
  );
}
