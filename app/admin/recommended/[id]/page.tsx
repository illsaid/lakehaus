'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { RecommendedForm } from '@/components/admin/recommended-form';
import type { RecommendedItem } from '@/lib/supabase/types';

export default function EditRecommendedPage() {
  const params = useParams();
  const [item, setItem] = useState<RecommendedItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('recommended_items')
        .select('*')
        .eq('id', params.id as string)
        .maybeSingle();
      setItem(data);
      setLoading(false);
    };
    fetch();
  }, [params.id]);

  if (loading) {
    return <p className="text-charcoal/30 text-sm">Loading...</p>;
  }

  if (!item) {
    return <p className="text-charcoal/30 text-sm">Item not found.</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-charcoal mb-8">
        Edit Recommendation
      </h1>
      <RecommendedForm item={item} />
    </div>
  );
}
