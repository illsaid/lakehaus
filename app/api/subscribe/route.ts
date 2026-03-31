import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export interface SubscribePayload {
  email: string;
  // Metadata fields — accepted and validated here but not yet persisted.
  // TODO: add columns source, page, lead_magnet, utm_source, utm_medium,
  // utm_campaign to the newsletter_subscribers table and include them in the
  // insert below once the migration is applied.
  source?: string;
  page?: string;
  lead_magnet?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export async function POST(request: Request) {
  try {
    const body: SubscribePayload = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // TODO: once the schema migration adds metadata columns, destructure them
    // from body and include in the insert object:
    // const { source, page, lead_magnet, utm_source, utm_medium, utm_campaign } = body;
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });

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
