'use client';

import { useRef, useEffect } from 'react'; // Removed useState
// Removed Send import
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartForm from '@/components/SmartForm'; // Added SmartForm import

gsap.registerPlugin(ScrollTrigger);

// Removed FormData interface

export default function ContactSection() {
  // Removed old state declarations: formData, isSubmitting, submitStatus

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null); // Changed type to HTMLDivElement
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Effect logic remains, assuming it's not the cause
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

  // Removed old handleChange and handleSubmit functions

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-bg-main">
      {/* Removed placeholder div */}
      {/* Uncommented main structure */}
      <div className="container mx-auto max-w-container px-6">
        {/* Title section with ref for GSAP */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16"> {/* Adjusted margin */}
          {/* Using title/text from guide */}
          <h2 className="font-satoshi font-bold text-3xl md:text-4xl mb-4">
            Let’s <span className="text-accent-cyan">connect</span>
          </h2>
          <p className="text-lg text-text-main/80 max-w-xl mx-auto"> {/* Adjusted text style/size */}
            Whether you’re here to collaborate or just want updates — I’d love to hear from you.
          </p>
        </div>

        {/* Wrapper div for the form to apply GSAP animation */}
        <div ref={formRef} className="max-w-3xl mx-auto"> {/* Removed type casting */}
          <SmartForm /> {/* Render the new SmartForm */}
        </div>
      </div>
      {/* Removed the old commented-out form */}
    </section>
  );
}
