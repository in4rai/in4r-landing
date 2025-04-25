import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Corrected import path

// Add a simple GET handler for diagnostics
export async function GET(req: Request) {
  return NextResponse.json({ message: 'SmartForm API endpoint is active.' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.hp && body.hp.trim() !== '') {
      // Log bot attempt but return a generic success to not alert the bot
      console.log('Bot detected (honeypot filled):', body);
      return NextResponse.json({ success: true });
    }

    const { name, email, role, intent, message } = body;

    // Basic validation
    if (!email || !intent) {
      console.error('Missing required fields:', { email, intent });
      return NextResponse.json({ error: 'Missing required fields: Email and intent are mandatory.' }, { status: 400 });
    }

    // Validate intent
    const validIntents = ['subscribe', 'contact', 'prototype'];
    if (!validIntents.includes(intent)) {
      console.error('Invalid intent value:', intent);
      return NextResponse.json({ error: 'Invalid intent value.' }, { status: 400 });
    }

    // Prepare data for Supabase
    const submissionData: {
      name?: string;
      email: string;
      role?: string;
      intent: string;
      message?: string;
    } = {
      email,
      intent,
    };
    if (name) submissionData.name = name;
    if (role) submissionData.role = role;
    // Only include message if intent is not 'subscribe' (as per form logic)
    if (intent !== 'subscribe' && message) {
      submissionData.message = message;
    } else if (intent !== 'subscribe' && !message) {
      // If it's contact/prototype but no message, maybe add a placeholder or handle as needed
      // For now, we allow empty message for contact/prototype based on form logic
    }


    console.log('Attempting to insert into Supabase:', submissionData);

    const { error } = await supabase.from('submissions').insert(submissionData);

    if (error) {
      console.error('Supabase insertion error:', error);
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }

    console.log('Submission successful for email:', email);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('API route error:', error);
    // Differentiate between JSON parsing errors and others
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body format.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
