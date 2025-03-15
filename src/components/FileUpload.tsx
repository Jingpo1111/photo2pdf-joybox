
import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, Image, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const imageFiles: File[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (allowedTypes.includes(file.type)) {
        imageFiles.push(file);
      } else {
        toast({
          title: "Unsupported file type",
          description: `${file.name} is not a supported image format.`,
          variant: "destructive"
        });
      }
    }

    if (imageFiles.length > 0) {
      onFilesSelected(imageFiles);
      toast({
        title: "Images uploaded",
        description: `${imageFiles.length} image${imageFiles.length === 1 ? '' : 's'} selected.`,
      });
    }
  }, [onFilesSelected, toast]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  }, [processFiles]);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div 
      className={cn(
        "w-full flex flex-col items-center justify-center",
        "rounded-xl p-8 transition-all duration-300 animate-fade-in",
        "drop-area glass-card relative overflow-hidden",
        isDragging ? "drop-area active scale-[1.02]" : ""
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-xl"></div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        multiple
        className="hidden"
        aria-label="Upload images"
      />
      
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 mb-4 animate-pulse-subtle">
        <UploadCloud className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="text-xl font-medium mb-2">Upload your photos</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        Drag and drop your images here, or click to browse
      </p>
      
      <button
        onClick={handleButtonClick}
        className={cn(
          "px-6 py-3 rounded-lg bg-primary text-primary-foreground",
          "hover:opacity-90 transition-all duration-200 animate-hover",
          "flex items-center gap-2 font-medium"
        )}
      >
        <Upload className="h-4 w-4" />
        Choose Images
      </button>
      
      <div className="mt-4 text-sm text-muted-foreground">
        Supported formats: JPEG, PNG, GIF, WEBP, HEIC
      </div>
    </div>
  );
};

export default FileUpload;
