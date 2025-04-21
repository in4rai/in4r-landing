'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Shield, Users } from 'lucide-react'; // Import new icons
import gsap from 'gsap';

export default function HeroSection() {
  const particleRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!particleRef.current) return;
    
    const particleContainer = particleRef.current;
    const particles: HTMLDivElement[] = []; // Add explicit type
    const numParticles = 700; // Increased number of particles
    
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute bg-accent-cyan/30 rounded-full';
      
      const size = Math.random() * 5 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particleContainer.appendChild(particle);
      particles.push(particle);
      
      gsap.to(particle, {
        x: `random(-50, 50, 1)`,
        y: `random(-50, 50, 1)`,
        opacity: `random(0.2, 0.7)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    
    gsap.fromTo(
      heroContentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );
    
    return () => {
      particles.forEach((particle) => {
        gsap.killTweensOf(particle);
        if (particleContainer.contains(particle)) {
          particleContainer.removeChild(particle);
        }
      });
    };
  }, []);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div 
        ref={particleRef} 
        className="absolute inset-0 pointer-events-none"
      ></div>
      
      <div className="container mx-auto max-w-container px-6 py-20 md:py-32 relative z-10">
        <div ref={heroContentRef} className="max-w-3xl">
          <h1 className="font-satoshi font-bold text-heading mb-6 leading-tight">
            AI-Powered Tools for{' '}
            <span className="text-accent-cyan">Smarter Research</span>
          </h1>
          
          {/* Increased bottom margin and added text justification */}
          <p className="text-body text-text-main/80 mb-10 max-w-2xl text-justify"> 
            I build intelligent AI tools that simplify complex scientific tasks—helping you analyze literature, generate hypotheses, and turn data into clear, impactful insights.
          </p>

          {/* Use UL for semantic list and reduced spacing */}
          <ul className="space-y-4"> 
            {/* Added text justification */}
            <li className="flex items-start gap-3 text-lg text-text-main/90 text-justify">
              <Zap size={20} className="text-accent-cyan mt-1 flex-shrink-0" aria-hidden="true" />
              <span>
                <span className="font-medium text-accent-cyan">Clearer Insights:</span> Easily discover hidden connections and fill knowledge gaps with tools specifically designed for your research area.
              </span>
            </li>
             {/* Added text justification */}
            <li className="flex items-start gap-3 text-lg text-text-main/90 text-justify">
              <Shield size={20} className="text-accent-cyan mt-1 flex-shrink-0" aria-hidden="true" />
              <span>
                <span className="font-medium text-accent-cyan">Data Security First:</span> Your data stays protected. My modular solutions integrate securely into your existing infrastructure, even in sensitive environments.
              </span>
            </li>
             {/* Added text justification */}
            <li className="flex items-start gap-3 text-lg text-text-main/90 text-justify">
              <Users size={20} className="text-accent-cyan mt-1 flex-shrink-0" aria-hidden="true" />
              <span>
                <span className="font-medium text-accent-cyan">Collaborative Solutions:</span> Let's create tailored tools that adapt and grow alongside your research.
              </span>
            </li>
          </ul>
          
          {/* Increased top margin */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10"> 
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-cyan text-bg-main font-medium rounded-md hover:bg-accent-cyan/90 transition-all animate-glow"
            >
              Start a Prototype
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              className="inline-flex items-center justify-center px-6 py-3 border border-accent-cyan rounded-md text-accent-cyan bg-transparent hover:bg-accent-cyan/10 transition-all"
            >
              View Use Cases
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-bg-main to-transparent"></div>
    </section>
  );
}
