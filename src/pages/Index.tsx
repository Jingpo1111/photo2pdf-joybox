
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PhotosEditor from '@/components/PhotosEditor';
import { convertImagesToPdf, downloadPdf } from '@/utils/pdfUtils';
import { Check } from 'lucide-react';

const Index = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFilesSelected = (files: File[]) => {
    setPhotos(prev => [...prev, ...files]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleReorderPhotos = (startIndex: number, endIndex: number) => {
    setPhotos(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const handleConvertToPdf = async () => {
    try {
      // Delay for animation effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const pdfBlob = await convertImagesToPdf(photos);
      downloadPdf(pdfBlob, "photo2pdf_conversion.pdf");
      
      toast({
        title: "Conversion successful",
        description: "Your PDF has been created and downloaded",
        icon: <Check className="h-4 w-4 text-green-500" />
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Conversion failed",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <HeroSection onFilesSelected={handleFilesSelected} />
        
        {photos.length > 0 && (
          <PhotosEditor
            photos={photos}
            onRemove={handleRemovePhoto}
            onReorder={handleReorderPhotos}
            onConvert={handleConvertToPdf}
          />
        )}
        
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
