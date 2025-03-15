
import React from 'react';
import { Image, Layers, FileText } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="max-w-5xl mx-auto py-16">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Why Choose Photo2PDF</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our tool is designed with simplicity and effectiveness in mind
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-xl animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Image className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Simple Interface</h3>
          <p className="text-muted-foreground">
            Our clean, intuitive design makes converting images to PDF effortless and quick.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-xl animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Batch Processing</h3>
          <p className="text-muted-foreground">
            Convert multiple images at once and arrange them in your preferred order.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-xl animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">High Quality</h3>
          <p className="text-muted-foreground">
            Your images are converted to PDF maintaining their original quality and resolution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
