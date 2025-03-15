
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FileDown, Loader2 } from 'lucide-react';

interface ConversionButtonProps {
  onConvert: () => Promise<void>;
  disabled: boolean;
}

const ConversionButton: React.FC<ConversionButtonProps> = ({ onConvert, disabled }) => {
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      await onConvert();
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <button
      onClick={handleConvert}
      disabled={disabled || isConverting}
      className={cn(
        "px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-3",
        "transition-all duration-300 transform hover:-translate-y-1",
        "bg-primary text-primary-foreground shadow-lg",
        "hover:shadow-xl hover:bg-primary/95",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        "min-w-[200px] animate-enter"
      )}
    >
      {isConverting ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Converting...
        </>
      ) : (
        <>
          <FileDown className="h-5 w-5" />
          Convert to PDF
        </>
      )}
    </button>
  );
};

export default ConversionButton;
