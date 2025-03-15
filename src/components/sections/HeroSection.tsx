
import React from 'react';
import FileUpload from '@/components/FileUpload';

interface HeroSectionProps {
  onFilesSelected: (files: File[]) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onFilesSelected }) => {
  return (
    <section className="max-w-5xl mx-auto mb-20">
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Simple • Fast • Secure
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-slide-up">
          Transform Your Photos to <span className="relative inline-block">
            PDF
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full transform"></div>
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
          The easiest way to convert your images to PDF documents in seconds. No signup required.
        </p>
      </div>

      <div className="space-y-8">
        <FileUpload onFilesSelected={onFilesSelected} />
      </div>
    </section>
  );
};

export default HeroSection;
