'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ArticleForm } from '@/components/admin/article-form';
import type { Article } from '@/lib/supabase/types';

export default function EditArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id as string)
        .maybeSingle();
      setArticle(data);
      setLoading(false);
    };
    fetch();
  }, [params.id]);

  if (loading) {
    return <p className="text-charcoal/30 text-sm">Loading...</p>;
  }

  if (!article) {
    return <p className="text-charcoal/30 text-sm">Article not found.</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        Edit Article
      </h1>
      <ArticleForm article={article} />
    </div>
  );
}
