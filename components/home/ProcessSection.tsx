'use client';

import { useEffect, useRef } from 'react';
import { User, Brain, Code, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ProcessSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const titleEl = titleRef.current;
    const stepEls = stepsRef.current.filter((el) => el !== null) as HTMLElement[];

    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleEl,
            start: 'top 80%',
          },
        }
      );
    }

    stepEls.forEach((step, index) => {
      gsap.fromTo(
        step,
        { y: 50, opacity: 0 }, // fromVars
        { // toVars
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1, // Stagger animation
        }
      );
    });
  }, []);

  const steps: Step[] = [
    {
      number: '01',
      icon: <User size={24} aria-hidden="true" />, // Slightly larger icon
      title: 'Understand Your Goals',
      description:
        'We\'ll discuss your objectives, challenges, and specific needs to clearly define the right approach.',
    },
    {
      number: '02',
      icon: <Brain size={24} aria-hidden="true" />, // Slightly larger icon
      title: 'Develop Custom AI Tools',
      description:
        'I build AI solutions tailored specifically for your research environment and data.',
    },
    {
      number: '03',
      icon: <Code size={24} aria-hidden="true" />, // Slightly larger icon
      title: 'Refine and Improve',
      description:
        'We’ll collaborate closely, testing and refining tools to ensure they deliver precisely the results you need.',
    },
    {
      number: '04',
      icon: <FileText size={24} aria-hidden="true" />, // Slightly larger icon
      title: 'Deliver Actionable Results',
      description:
        'You\'ll receive intuitive, evidence-based reports and tools that help drive successful research outcomes.',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-32 bg-surface">
      <div className="container mx-auto px-6 max-w-container">
        {/* Heading */}
        <div className="text-center mb-16"> {/* Increased bottom margin */}
           {/* Added hover effect to title span */}
          <h2 ref={titleRef} className="font-satoshi font-bold text-3xl md:text-4xl mb-4 inline-block"> {/* Added inline-block */}
            How We'll <span className="text-accent-cyan hover:shadow-lg hover:shadow-glow transition-all duration-300 px-2 py-1 rounded">Collaborate</span> {/* Added hover classes, padding, rounded */}
          </h2>
          <p className="text-text-main/70 max-w-2xl mx-auto block"> {/* Ensure paragraph is block */}
            Together, we'll turn your research challenges into practical, AI-driven solutions:
          </p>
        </div>

        {/* Steps Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Grid layout */}
          {steps.map((step, index) => (
            <li
              key={step.number}
              ref={(el) => {
                stepsRef.current[index] = el;
              }}
              className="opacity-0" // Start hidden for animation
            >
              <Card className="h-full bg-surface-raised border-border-subtle shadow-sm hover:shadow-md transition-shadow duration-300"> {/* Card styling */}
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  {/* Number and Icon (swapped positions) */}
                  <div className="flex-shrink-0 font-mono font-semibold text-accent-cyan text-lg">
                    {step.number}
                  </div>
                  {/* Centered title */}
                  <div className="flex-grow text-center">
                    <CardTitle className="font-satoshi font-bold text-xl text-text-main">
                      {step.title}
                    </CardTitle>
                  </div>
                  <div className="flex-shrink-0 p-3 rounded-lg bg-accent-cyan/10 text-accent-cyan">
                    {step.icon}
                  </div>
                </CardHeader>
                <CardContent>
                   {/* Use full contrast and justify description */}
                  <p className="text-text-main text-justify">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
