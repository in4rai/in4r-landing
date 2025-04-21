'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Updated navLinks to match section IDs and titles
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' }, // Corresponds to "What I Build?"
  { name: 'Process', href: '#process' }, // Corresponds to "How We Work Together?"
  { name: 'About', href: '#about' }, // Corresponds to "About the Founder"
  { name: 'Contact', href: '#contact' }, // Corresponds to "Get in Touch"
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isScrolled = scrollPosition > 50;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto max-w-container px-6">
        <div className="flex items-center justify-between">
          <Link href="#home" className="flex items-center px-4 py-2">
            <Image
              src="/logo.jpg"
              alt="in4r.ai logo"
              width={200} // Increased width prop
              height={53} // Increased height prop (maintaining aspect ratio approx)
              className="object-contain dark:invert-0" // Removed h- and w- classes
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-main hover:text-accent-cyan transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            className="inline-flex items-center justify-center px-5 py-2 border border-accent-cyan rounded-md text-accent-cyan bg-surface/50 hover:bg-accent-cyan/10 transition-all hidden md:flex"
          >
            Start a Prototype
          </button>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-accent-cyan"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-lg shadow-xl transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="container px-6 py-6 mx-auto flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-main hover:text-accent-cyan py-2 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              className="inline-flex items-center justify-center px-5 py-2 border border-accent-cyan rounded-md text-accent-cyan bg-surface/50 hover:bg-accent-cyan/10 transition-all mt-4 w-full"
            >
              Start a Prototype
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
