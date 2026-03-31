'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.replace('/admin');
    }
  }

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-semibold text-charcoal tracking-tight">
            LAKEHAUS
          </h1>
          <p className="text-sm text-charcoal/40 mt-1">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/40 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-card-warm border border-soft-border rounded text-charcoal text-sm focus:outline-none focus:border-charcoal/30 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[11px] font-sans uppercase tracking-[0.15em] text-charcoal/40 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-card-warm border border-soft-border rounded text-charcoal text-sm focus:outline-none focus:border-charcoal/30 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-muted-rose text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-charcoal text-bone rounded text-sm font-medium tracking-wide hover:bg-charcoal/90 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
