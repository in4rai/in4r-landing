'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

// Define the structure of the form data
interface SmartFormData {
  name: string;
  email: string;
  role: string;
  intent: '' | 'subscribe' | 'contact' | 'prototype'; // More specific type for intent
  message: string;
  hp: string; // Honeypot field
}

// Define the possible statuses for the form submission
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function SmartForm() {
  // State for form data
  const [form, setForm] = useState<SmartFormData>({
    name: '',
    email: '',
    role: '',
    intent: '', // Default empty intent
    message: '',
    hp: '', // Honeypot field
  });

  // State for submission status
  const [status, setStatus] = useState<FormStatus>('idle');
  // State for feedback message to the user
  const [msg, setMsg] = useState<string>('');

  // Handle changes in form inputs, textareas, and selects
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Ensure 'intent' is correctly typed when updating
    if (name === 'intent') {
      setForm((prev) => ({
        ...prev,
        [name]: value as SmartFormData['intent'], // Cast value to the specific intent type
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setStatus('submitting'); // Update status to submitting
    setMsg(''); // Clear previous messages

    try {
      // Send form data to the API route
      const res = await fetch('/api/smart-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), // Send the current form state
      });

      // Attempt to parse the response as JSON
      let result;
      try {
        result = await res.json();
      } catch (jsonError) {
        // Handle cases where the response is not valid JSON
        console.error('Failed to parse JSON response:', jsonError);
        setStatus('error');
        setMsg('An unexpected response was received from the server.');
        return;
      }


      // Check if the request was successful
      if (!res.ok) {
        setStatus('error');
        // Use the error message from the API response if available, otherwise use a default message
        setMsg(result.error || 'Submission failed. Please try again.');
        return; // Exit the function on error
      }

      // On successful submission
      setStatus('success');
      setMsg('Thanks! We received your submission.'); // Updated success message
      // Reset the form fields to their initial state
      setForm({ name: '', email: '', role: '', intent: '', message: '', hp: '' });

    } catch (error) {
      // Catch any network or unexpected errors during fetch
      console.error('Form submission fetch error:', error);
      setStatus('error');
      setMsg('An error occurred while submitting the form. Please check your connection and try again.');
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 md:p-8 rounded-lg shadow-md space-y-6 max-w-xl mx-auto border border-border">
      {/* Honeypot field: Hidden from users, intended to catch bots */}
      <input
        type="text"
        name="hp"
        value={form.hp}
        onChange={handleChange}
        className="hidden" // Visually hide the input
        autoComplete="off" // Disable browser autofill
        tabIndex={-1} // Remove from tab navigation
        aria-hidden="true" // Hide from screen readers
      />

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-main mb-1">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required // HTML5 validation for email format and presence
          value={form.email}
          onChange={handleChange}
          className="w-full bg-bg-main border border-border text-text-main rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
          placeholder="you@example.com"
        />
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-main mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-bg-main border border-border text-text-main rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
          placeholder="Your Name"
        />
      </div>

      {/* Role Field */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-text-main mb-1">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full bg-bg-main border border-border text-text-main rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
          placeholder="e.g., Developer, Researcher, Student"
        />
      </div>

      {/* Intent Field */}
      <div>
        <label htmlFor="intent" className="block text-sm font-medium text-text-main mb-1">Why are you reaching out? *</label>
        <select
          id="intent"
          name="intent"
          value={form.intent}
          onChange={handleChange}
          required // This field is mandatory
          className="w-full bg-bg-main border border-border text-text-main rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 appearance-none" // Added appearance-none for custom arrow styling if needed
        >
          <option value="" disabled>Select an option...</option>
          <option value="subscribe">Subscribe to newsletter</option>
          <option value="prototype">Discuss a prototype project</option>
          <option value="contact">Ask a general question</option>
        </select>
      </div>

      {/* Message Field: Conditionally rendered based on intent */}
      {form.intent && form.intent !== 'subscribe' && (
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-main mb-1">
            Message {form.intent === 'contact' || form.intent === 'prototype' ? '*' : ''}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required={form.intent === 'contact' || form.intent === 'prototype'} // Required for contact/prototype
            className="w-full bg-bg-main border border-border text-text-main rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 resize-none"
            placeholder={
              form.intent === 'prototype' ? "Briefly describe your project idea..." :
              form.intent === 'contact' ? "Your question or comment..." : ""
            }
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'} // Disable button while submitting
        className="w-full inline-flex items-center justify-center px-6 py-3 bg-accent-cyan text-bg-main font-medium rounded-md hover:bg-accent-cyan/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bg-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          'Send Message' // Button text changes based on status
        )}
      </button>

      {/* Status Message Area */}
      {status !== 'idle' && msg && ( // Only show if status is not idle and there's a message
        <p className={`text-center mt-4 text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {msg}
        </p>
      )}
    </form>
  );
}
