
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
              <img src="/logo.svg" alt="N Logo" className="w-full h-full" />
            </div>
            <span className="text-sm font-medium">N<span className="font-bold">2</span>PDF</span>
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
              © {currentYear} N2PDF. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
