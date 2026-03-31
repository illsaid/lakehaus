'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (error) {
        if (error.code === '23505') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-charcoal py-20 lg:py-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-bone leading-tight">
          Stay in the conversation
        </h2>
        <p className="mt-4 text-base text-bone/50 leading-relaxed max-w-lg mx-auto">
          Join women who receive clear, science-aware wellness guidance every
          week. No spam, no hype.
        </p>

        {status === 'success' ? (
          <div className="mt-8 py-4 px-6 bg-bone/10 rounded-lg border border-bone/10">
            <p className="text-bone/70 text-sm">
              Welcome to the community. Check your inbox soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 bg-bone/5 border border-bone/15 rounded text-bone placeholder:text-bone/25 text-sm focus:outline-none focus:border-bone/30 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-bone text-charcoal rounded text-sm font-medium hover:bg-bone/90 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-muted-rose/80">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
