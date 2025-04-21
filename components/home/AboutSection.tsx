'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { GraduationCap, Database, Lightbulb, Mic } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CredentialProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Credential({ icon, title, description }: CredentialProps) {
  const credentialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!credentialRef.current) return;

    gsap.fromTo(
      credentialRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: credentialRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  return (
    <div
      ref={credentialRef}
      className="flex items-start mb-6"
    >
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-cyan/10 text-accent-cyan transition-transform hover:scale-110 hover:bg-accent-cyan/20">
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="font-satoshi text-lg font-medium text-text-main">{title}</h4>
        <p className="mt-1 text-text-main/70 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const credentials = [
    {
      icon: <GraduationCap size={20} aria-hidden="true" />,
      title: 'PhD in Stem Cells & Toxicology',
      description: 'Newcastle University, Marie Skłodowska-Curie ITN Fellowship',
    },
    {
      icon: <Database size={20} aria-hidden="true" />,
      title: 'AI Research Lead, VHP4Safety',
      description: 'Developed AI-powered chemical safety workflows funded by NWO',
    },
    {
      icon: <Lightbulb size={20} aria-hidden="true" />,
      title: 'Inventor, iPSC-based Airway Model',
      description: 'Patented in-vitro model for toxicology research during PhD',
    },
    {
      icon: <Mic size={20} aria-hidden="true" />,
      title: 'Hackathon Winner & Speaker',
      description: 'Winner of MIT/Roche, ONTOX hackathons; regular speaker at AI-science events',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-bg-main">
      <div className="container mx-auto max-w-container px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start"> {/* Changed items-center to items-start */}
          <div ref={contentRef} className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="font-satoshi font-bold text-3xl md:text-4xl mb-6">
              About the <span className="text-accent-cyan">Founder</span>
            </h2>
            <h3 className="font-satoshi font-medium text-xl mb-4">
              Ivo Djidrovski, PhD
            </h3>

            <div className="text-text-main/80 space-y-6 mb-10 text-justify"> {/* Added text-justify */}
              <p>
                I'm a scientist, AI systems architect, and innovator passionate about developing tools that help researchers tackle complex scientific challenges.
              </p>
              <p>
                For over a decade, my work has bridged regenerative biology, toxicology, and artificial intelligence. I've created patented stem cell models—including commercially available lung airway and liver systems—and built advanced AI-driven workflows for chemical safety with the NWO VHP4Safety project. My approach merges rigorous science with creative problem-solving, always seeking practical solutions to biological complexity.
              </p>
              <p>
                My commitment to personalized toxicology and precision medicine guides my philosophy: scientific tools must be intuitive, modular, and empowering. I believe in reshaping how science is practiced—making it more accessible, collaborative, and effective.
              </p>
              <p>
                Through my independent venture, in4R.ai, I design secure, transparent AI agents that amplify human expertise without compromising autonomy or data privacy. Collaborating closely with researchers, I turn complex scientific challenges into clear, actionable tools.
              </p>
            </div>

            {/* Changed to grid layout for credentials */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {credentials.map((cred, idx) => (
                <Credential
                  key={idx}
                  icon={cred.icon}
                  title={cred.title}
                  description={cred.description}
                />
              ))}
            </div>
          </div>

          <div ref={imageRef} className="w-full md:w-1/2 order-1 md:order-2 relative">
            {/* Reverted height and object position to original */}
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg"> 
              <Image
                src="/images/founder-portrait.jpg" // Updated image source
                alt="Portrait of Ivo Djidrovski"
                fill
                // Reverted object position
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 opacity-50 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-4 -right-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] border-2 border-accent-cyan rounded-lg -z-10" />

            {/* Moved Blockquote inside image column, below image/border, adjusted positioning */}
            <blockquote className="relative -mt-8 mx-auto w-[90%] md:w-[80%] max-w-lg p-6 bg-bg-secondary rounded-lg shadow-md z-10
                                   before:content-['“'] before:absolute before:-top-2 before:left-2 before:text-6xl before:text-accent-cyan before:opacity-70
                                   after:content-['”'] after:absolute after:-bottom-6 after:right-2 after:text-6xl after:text-accent-cyan after:opacity-70">
              <p className="text-center text-2xl italic text-text-main/90"> {/* Changed text-xl to text-2xl */}
                "I believe in a future where technology empowers us to grow, evolve, and reach our highest potential—enhancing what makes us fundamentally human."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
