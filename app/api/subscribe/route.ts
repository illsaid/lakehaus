import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/utils';

export interface SubscribePayload {
  email: string;
  source?: string;
  page?: string;
  lead_magnet?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  requestLog.set(ip, recent);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;
  recent.push(now);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: SubscribePayload = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const supabase = createServerClient();

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: sanitizedEmail });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed' });
      }
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
