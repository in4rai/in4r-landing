import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// IMPORTANT: Create a .env.local file in your project root and add your Resend API key:
// RESEND_API_KEY=your_api_key_here
// Also add the email address you want to send emails TO:
// CONTACT_FORM_RECEIVER_EMAIL=your_email@example.com

const resend = new Resend(process.env.RESEND_API_KEY);
const receiverEmail = process.env.CONTACT_FORM_RECEIVER_EMAIL;

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API key is missing. Set RESEND_API_KEY in .env.local');
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }
  if (!receiverEmail) {
    console.error('Receiver email is missing. Set CONTACT_FORM_RECEIVER_EMAIL in .env.local');
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Honeypot check
    if (subject) {
      console.log('Honeypot triggered');
      return new Response(JSON.stringify({ message: 'Message received.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [receiverEmail],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <p>You received a new message from your website contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Email sent:', data);
    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
