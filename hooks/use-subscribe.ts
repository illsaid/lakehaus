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

    window.location.href = `https://lakehaushealth.beehiiv.com/subscribe?email=${encodeURIComponent(email)}`;
  }

  return { email, setEmail, status, handleSubmit };
}
