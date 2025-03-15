
import React from 'react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-16 border-t border-border animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-6 h-6 relative overflow-hidden mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-white absolute inset-0 p-0.5"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M15 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                <path d="M9 22V2" />
              </svg>
            </div>
            <span className="text-sm font-medium">Photo<span className="font-bold">2</span>PDF</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <nav className="flex space-x-6 mb-4 md:mb-0 md:mr-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
            
            <span className="text-xs text-muted-foreground">
              © {currentYear} Photo2PDF. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
