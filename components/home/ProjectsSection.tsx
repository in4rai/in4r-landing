'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Personalized Health and Supplementation',
      category: 'Healthcare',
      description:
        'We harnessed individual genomic data (e.g., 23andMe) and blood biomarkers to develop APOE4-focused health plans. These plans integrate AI-driven risk stratification, supplement optimization, and behavioral interventions to help users reduce long-term cognitive decline risk. By combining predictive modeling with lifestyle design, we enabled proactive, evidence-based health management with clear, measurable outcomes.',
      image: '/personalised health plan.png',
    },
    {
      id: 2,
      title: 'Chemical Safety through Exposure Modeling',
      category: 'Industrial',
      description:
        'Our intelligent exposure modeling tools powered safe-by-design innovation by mapping chemical risks across life cycles. We helped R&D teams identify safer alternatives, evaluate early-stage exposure potential, and apply sustainability criteria upfront. The result: lower regulatory burden, faster go-to-market timelines, and enhanced product safety—all without compromising innovation.',
      image: '/chemical safety.png',
    },
    {
      id: 3,
      title: 'Optimal In Vitro Experimentation',
      category: 'Biotech',
      description:
        'We used AI to design targeted in vitro assays by pinpointing critical knowledge gaps and forecasting experimental outcomes with high accuracy. By simulating response dynamics, we guided researchers toward the most informative and resource-efficient experimental setups. The outcome: reduced iteration cycles, higher-quality data, and faster hypothesis validation.',
      image: '/optimal in vitro.png',
    },
  ];

  useEffect(() => {
    if (!titleRef.current) return;

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
  }, []);

  const nextProject = () => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const activeProjectData = projects[activeProject];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 bg-surface"
    >
      <div className="container mx-auto max-w-container px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-satoshi font-bold text-3xl md:text-4xl mb-4">
            Case <span className="text-accent-cyan">Studies</span>
          </h2>
          <p className="text-text-main/70 max-w-2xl mx-auto">
            See how our autonomous AI tools have helped researchers across various scientific domains accelerate discovery and generate novel insights.
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-bg-main rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
                <Image
                  src={activeProjectData.image}
                  alt={activeProjectData.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-bg-main/40 mix-blend-overlay"></div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12">
                <span className="inline-block px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full text-sm font-medium mb-4">
                  {activeProjectData.category}
                </span>
                <h3 className="font-satoshi font-bold text-2xl mb-4">
                  {activeProjectData.title}
                </h3>
                <p className="text-text-main/70 mb-8 text-justify">
                  {activeProjectData.description}
                </p>

                <div className="flex justify-between items-center mt-8">
                  <div className="flex space-x-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveProject(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === activeProject
                            ? 'w-8 bg-accent-cyan'
                            : 'w-2 bg-accent-cyan/30'
                        }`}
                        aria-label={`Go to project ${index + 1}`}
                      ></button>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={prevProject}
                      className="h-10 w-10 rounded-full border border-accent-cyan/50 flex items-center justify-center text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
                      aria-label="Previous project"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={nextProject}
                      className="h-10 w-10 rounded-full border border-accent-cyan/50 flex items-center justify-center text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
                      aria-label="Next project"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
