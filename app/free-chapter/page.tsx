'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { supabase } from '@/lib/supabase/client';
import { CircleCheck as CheckCircle } from 'lucide-react';

export default function FreeChapterPage() {
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

      if (error && error.code !== '23505') {
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="bg-bone py-20 lg:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-muted-rose mb-4">
                  Free Preview
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-[1.1]">
                  Read the first chapter free
                </h1>
                <p className="mt-6 text-base text-charcoal/50 leading-relaxed">
                  Get instant access to Chapter 1 of Younger, Longer: &ldquo;The
                  New Science of Aging Well.&rdquo; Discover the foundational
                  principles that frame every protocol in the guide.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'The longevity mindset shift most women miss',
                    'Why the health advice you grew up with may be wrong',
                    'The six pillars framework for aging well',
                    'How to audit your current health trajectory',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card-warm rounded-xl border border-soft-border/60 p-8 lg:p-10">
                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-deep-sage" />
                    </div>
                    <h2 className="font-serif text-2xl font-light text-charcoal mb-3">
                      Check your inbox
                    </h2>
                    <p className="text-sm text-charcoal/50 leading-relaxed">
                      Your free chapter is on its way. Welcome to the LAKEHAUS
                      community.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-light text-charcoal mb-2">
                      Get instant access
                    </h2>
                    <p className="text-sm text-charcoal/40 mb-6">
                      Enter your email and we will send Chapter 1 straight to
                      your inbox.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/40 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 bg-bone border border-soft-border rounded text-charcoal placeholder:text-charcoal/25 text-sm focus:outline-none focus:border-charcoal/30 transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full px-6 py-3.5 bg-charcoal text-bone rounded text-sm font-medium tracking-wide hover:bg-charcoal/90 transition-colors disabled:opacity-50"
                      >
                        {status === 'loading'
                          ? 'Sending...'
                          : 'Send Me Chapter 1'}
                      </button>
                    </form>
                    {status === 'error' && (
                      <p className="mt-3 text-sm text-muted-rose/80 text-center">
                        Something went wrong. Please try again.
                      </p>
                    )}
                    <p className="mt-4 text-[11px] text-charcoal/25 text-center leading-relaxed">
                      No spam. Unsubscribe anytime. We respect your inbox.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
