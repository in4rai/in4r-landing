import Link from 'next/link';
import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface pt-20 pb-8">
      <div className="container mx-auto max-w-container px-6">
        {/* Changed to 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10"> 
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-accent-cyan" />
              <span className="font-satoshi font-bold text-2xl">
                in<span className="text-accent-cyan">4R</span>.ai 
              </span>
            </Link>
            <p className="text-text-main/80 mb-6"> {/* Adjusted text color */}
              Autonomous Tools for Scientific Thinking
            </p>
          </div>

          {/* Combined Navigation & Resources */}
          <div className="md:col-span-1">
            <h3 className="font-satoshi font-bold text-lg mb-4">Navigation</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <Link href="#home" className="text-text-main/80 hover:text-accent-cyan transition-colors">Home</Link>
              <Link href="#features" className="text-text-main/80 hover:text-accent-cyan transition-colors">Features</Link>
              <Link href="#process" className="text-text-main/80 hover:text-accent-cyan transition-colors">Process</Link>
              <Link href="#about" className="text-text-main/80 hover:text-accent-cyan transition-colors">About</Link>
              <Link href="#projects" className="text-text-main/80 hover:text-accent-cyan transition-colors">Projects</Link>
              <Link href="#contact" className="text-text-main/80 hover:text-accent-cyan transition-colors">Contact</Link>
            </div>
            
            <h3 className="font-satoshi font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="https://cellstocircuits.substack.com/" target="_blank" rel="noopener noreferrer" className="text-text-main/80 hover:text-accent-cyan transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
             <h3 className="font-satoshi font-bold text-lg mb-4">Connect</h3> {/* Added title */}
             <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/in/ivo-djidrovski-phd-741508124/" target="_blank" rel="noopener noreferrer" className="text-text-main/80 hover:text-accent-cyan transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </Link>
              <Link href="mailto:ivo@in4r.ai" className="text-text-main/80 hover:text-accent-cyan transition-colors" aria-label="Email">
                <Mail size={20} />
              </Link>
              {/* Add Github/Twitter later if needed */}
            </div>
          </div>
        </div>

        {/* Updated bottom section with KVK */}
        <div className="border-t border-border-subtle mt-12 pt-8 text-center text-text-main/70 text-sm space-y-2"> {/* Adjusted colors */}
          <p>&copy; {currentYear} in4R.ai. All rights reserved.</p>
          <p>
            <a href="https://www.kvk.nl/bestellen/#/97039861000062309676" target="_blank" rel="noopener noreferrer" className="hover:underline">
              KVK-nummer: 97039861
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
