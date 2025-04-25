'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  message: string;
  subject: string; // Honeypot field
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    subject: '', // Initialize honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !formRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ status: 'idle', message: '' }); // Reset status on new submission

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // --- START CHANGE ---
      if (!response.ok) {
        // Try to get more specific error text from the response body
        let errorText = 'Failed to send message.';
        try {
          errorText = await response.text(); // Read response as text if not ok
          console.error('API Error Response Text:', errorText); // Log for debugging
        } catch (textError) {
          console.error('Could not read error response text:', textError);
        }
        // Throw an error using the text obtained or a fallback message
        throw new Error(`API Error (${response.status}): ${errorText.substring(0, 100)}...` || 'Failed to send message.');
      }

      // Only parse JSON if the response was ok
      const result = await response.json();
      // --- END CHANGE ---

      // No changes needed below this line in the try block
      setSubmitStatus({
        status: 'success',
        message: 'Your message has been sent successfully!',
      });
      setFormData({ name: '', email: '', message: '', subject: '' });

    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        status: 'error',
        message: error.message || 'There was an error sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-bg-main">
      <div className="container mx-auto max-w-container px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-satoshi font-bold text-3xl md:text-4xl mb-4">
            Get in <span className="text-accent-cyan">Touch</span>
          </h2>
          <p className="text-text-main/70 max-w-2xl mx-auto">
            Have questions about how our autonomous AI tools can accelerate your research? Contact us to learn more or request a demo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-surface p-8 md:p-12 rounded-lg"
          >
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-main mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-bg-main border border-surface text-text-main rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
                  required
                />
              </div>

              {/* Honeypot Field: Hidden input to catch bots */}
              <div className="absolute left-[-5000px]" aria-hidden="true">
                <label htmlFor="subject" className="sr-only">Subject (Don't fill this out if you're human)</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-main mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-bg-main border border-surface text-text-main rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-main mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-bg-main border border-surface text-text-main rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent-cyan text-bg-main font-medium rounded-md hover:bg-accent-cyan/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bg-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </div>

              {submitStatus.status !== 'idle' && (
                <div
                  className={`p-4 rounded-md ${
                    submitStatus.status === 'success'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {submitStatus.message.replace(/'/g, ''')} {/* Escape single quotes */}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
