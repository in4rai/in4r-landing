'use client';

import { useEffect, useRef } from 'react';
import { Search, Network, Code, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-surface p-8 rounded-lg hover:shadow-lg hover:shadow-glow transition-all duration-300 group flex flex-col" // Added flex-col for structure
    >
      {/* Flex container for icon and title */}
      <div className="flex items-center gap-4 mb-4"> 
        <div className="p-3 bg-bg-main rounded-full inline-block text-accent-cyan group-hover:text-accent-violet transition-colors duration-300 flex-shrink-0"> {/* Adjusted padding */}
          {icon}
        </div>
        <h3 className="font-satoshi font-bold text-xl">{title}</h3>
      </div>
      {/* Description takes remaining space and is justified */}
      <p className="text-text-main/70 flex-grow text-justify">{description}</p> 
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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

  const features = [
    {
      icon: <Search size={24} />,
      title: 'Intelligent Literature Review',
      description:
        'Efficiently search, analyze, and summarize vast scientific literature using AI-driven tools. Quickly find the most relevant information tailored specifically to your research needs.',
    },
    {
      icon: <Network size={24} />,
      title: 'Explainable Reasoning and Workflows',
      description:
        'I develop clear, traceable reasoning pathways connecting diverse datasets and information. Each workflow is custom-built to align precisely with your research objectives, ensuring clarity and useful insights.',
    },
    {
      icon: <Code size={24} />,
      title: 'Secure and Private Integration',
      description:
        'My modular solutions seamlessly integrate with your existing tools, proprietary datasets, or APIs—even within highly secure or isolated environments. Keep your data private while enhancing workflow efficiency.',
    },
    {
      icon: <FileText size={24} />,
      title: 'Professional, Insightful Reporting',
      description:
        'Receive visually appealing, publication-quality reports that clearly connect insights directly to your source data, ready for collaboration, publication, and stakeholder presentations.',
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 md:py-32 bg-bg-main"
    >
      <div className="container mx-auto max-w-container px-6">
        <div ref={titleRef} className="text-center mb-16">
           {/* Added hover effect to title span */}
          <h2 className="font-satoshi font-bold text-3xl md:text-4xl mb-4 inline-block"> {/* Added inline-block */}
            What Can I Do For <span className="text-accent-cyan hover:shadow-lg hover:shadow-glow transition-all duration-300 px-2 py-1 rounded">You</span>? {/* Added hover classes, padding, rounded */}
          </h2>
          <p className="text-text-main/70 max-w-2xl mx-auto block"> {/* Ensure paragraph is block */}
            My specialized AI tools support researchers across scientific fields by speeding up discovery and delivering actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
