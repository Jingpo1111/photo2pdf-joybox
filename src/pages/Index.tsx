
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import PhotoPreview from '@/components/PhotoPreview';
import ConversionButton from '@/components/ConversionButton';
import Footer from '@/components/Footer';
import { convertImagesToPdf, downloadPdf } from '@/utils/pdfUtils';
import { ArrowDown, Check, Image, FileText, Layers } from 'lucide-react';

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
            <FileUpload onFilesSelected={handleFilesSelected} />
            
            {photos.length > 0 && (
              <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
                <PhotoPreview
                  photos={photos}
                  onRemove={handleRemovePhoto}
                  onReorder={handleReorderPhotos}
                />
                
                <div className="flex justify-center mt-10">
                  <ConversionButton 
                    onConvert={handleConvertToPdf} 
                    disabled={photos.length === 0} 
                  />
                </div>
              </div>
            )}
          </div>
        </section>

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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
