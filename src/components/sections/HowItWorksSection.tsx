
import React from 'react';
import { ArrowDown, Layers, FileText } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="max-w-5xl mx-auto py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Converting your photos to PDF is as easy as 1-2-3
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" style={{ transform: "translateX(-50%)" }}></div>
        
        <div className="space-y-16 relative">
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="mb-8 md:mb-0 md:w-1/2 flex justify-end">
              <div className="w-full max-w-xs text-center md:text-right animate-slide-up">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4 md:ml-auto">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Upload Your Photos</h3>
                <p className="text-muted-foreground">
                  Drag and drop your images or select them from your device
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white border-4 border-primary z-10"></div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg bg-primary/5 p-4 w-full max-w-xs animate-slide-up">
                <ArrowDown className="h-16 w-16 mx-auto text-primary opacity-30" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <div className="w-full max-w-xs text-center md:text-left animate-slide-up">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Arrange Your Images</h3>
                <p className="text-muted-foreground">
                  Organize the order of your images by dragging and dropping
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white border-4 border-primary z-10"></div>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <div className="rounded-lg bg-primary/5 p-4 w-full max-w-xs animate-slide-up">
                <Layers className="h-16 w-16 mx-auto text-primary opacity-30" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="mb-8 md:mb-0 md:w-1/2 flex justify-end">
              <div className="w-full max-w-xs text-center md:text-right animate-slide-up">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4 md:ml-auto">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">Download Your PDF</h3>
                <p className="text-muted-foreground">
                  Click the convert button and save your new PDF file
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white border-4 border-primary z-10"></div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg bg-primary/5 p-4 w-full max-w-xs animate-slide-up">
                <FileText className="h-16 w-16 mx-auto text-primary opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
