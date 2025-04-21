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
    const { name, email, message, subject } = body; // 'subject' is our honeypot field

    // --- Basic Spam Check (Honeypot) ---
    if (subject) {
      // If the hidden 'subject' field is filled, it's likely a bot
      console.log('Honeypot field filled, likely spam.');
      // Return a success response to not alert the bot, but don't send the email
      return NextResponse.json({ message: 'Message received.' });
    }

    // --- Server-Side Validation ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Basic email format validation (consider a more robust library for production)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // --- Send Email using Resend ---
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Must be a verified domain in Resend (or onboarding@resend.dev for testing)
      to: [receiverEmail], // The email address you want to receive messages at
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
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Failed to send message.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
