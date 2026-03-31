'use client';

import { useState } from 'react';
import type { SubscribePayload } from '@/app/api/subscribe/route';

export type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseSubscribeOptions
  extends Omit<SubscribePayload, 'email'> {}

export function useSubscribe(options: UseSubscribeOptions = {}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...options }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return { email, setEmail, status, handleSubmit };
}
