
import React from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center animate-slide-down z-10">
      <div className="flex items-center gap-2 animate-fade-in">
        <div className="w-10 h-10 relative overflow-hidden">
          <img src="/logo.svg" alt="N Logo" className="w-full h-full" />
        </div>
        <h1 className="text-xl font-medium tracking-tight">N<span className="font-bold">2</span>PDF</h1>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <a 
          href="#" 
          className={cn(
            "text-sm font-medium animate-hover",
            "opacity-70 hover:opacity-100 transition-all duration-200",
            "after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100",
            "after:transition-transform after:duration-300 after:origin-left"
          )}
        >
          Home
        </a>
        <a 
          href="#features" 
          className={cn(
            "text-sm font-medium animate-hover",
            "opacity-70 hover:opacity-100 transition-all duration-200",
            "after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100",
            "after:transition-transform after:duration-300 after:origin-left"
          )}
        >
          Features
        </a>
        <a 
          href="#how-it-works" 
          className={cn(
            "text-sm font-medium animate-hover",
            "opacity-70 hover:opacity-100 transition-all duration-200",
            "after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100",
            "after:transition-transform after:duration-300 after:origin-left"
          )}
        >
          How It Works
        </a>
      </nav>
    </header>
  );
};

export default Header;
