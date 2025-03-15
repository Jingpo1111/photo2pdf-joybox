
import React from 'react';
import PhotoPreview from '@/components/PhotoPreview';
import ConversionButton from '@/components/ConversionButton';

interface PhotosEditorProps {
  photos: File[];
  onRemove: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onConvert: () => Promise<void>;
}

const PhotosEditor: React.FC<PhotosEditorProps> = ({ 
  photos, 
  onRemove, 
  onReorder, 
  onConvert 
}) => {
  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <PhotoPreview
        photos={photos}
        onRemove={onRemove}
        onReorder={onReorder}
      />
      
      <div className="flex justify-center mt-10">
        <ConversionButton 
          onConvert={onConvert} 
          disabled={photos.length === 0} 
        />
      </div>
    </div>
  );
};

export default PhotosEditor;
