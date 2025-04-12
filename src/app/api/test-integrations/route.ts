import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    // Test Supabase connection
    const { data: supabaseTest, error: supabaseError } = await supabase
      .from('test')
      .select('*')
      .limit(1);

    // If the table doesn't exist, that's okay - we just want to verify the connection
    if (supabaseError && supabaseError.code !== 'PGRST116') {
      throw new Error(`Supabase error: ${supabaseError.message}`);
    }

    // Test Resend
    const { data: emailTest, error: emailError } = await resend.emails.send({
      from: 'test@quotelinker.com',
      to: 'test@quotelinker.com',
      subject: 'Integration Test',
      html: '<p>This is a test email to verify Resend integration.</p>',
    });

    if (emailError) {
      throw new Error(`Resend error: ${emailError.message}`);
    }

    return NextResponse.json({
      status: 'success',
      message: 'All integrations are working properly',
      supabase: 'connected',
      resend: 'connected',
      googleAnalytics: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      gtm: process.env.NEXT_PUBLIC_GTM_ID,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 