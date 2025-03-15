
import React, { useState } from 'react';
import { X, Move, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoPreviewProps {
  photos: File[];
  onRemove: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

interface PhotoItemProps {
  photo: File;
  index: number;
  onRemove: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, index, onRemove, onDragStart, onDragOver, onDragEnd }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  React.useEffect(() => {
    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  if (!previewUrl) return null;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={cn(
        "relative group rounded-lg overflow-hidden",
        "border border-border transition-all duration-200",
        "animate-scale-in h-40 w-40 md:h-48 md:w-48",
        "flex items-center justify-center cursor-move"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={previewUrl}
        alt={`Preview ${index + 1}`}
        className="h-full w-full object-cover transition-transform duration-500"
        style={{
          transform: isHovering ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      
      <div 
        className={cn(
          "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100",
          "transition-opacity duration-200 flex items-center justify-center"
        )}
      >
        <Move className="text-white w-6 h-6 opacity-70" />
      </div>
      
      <button
        onClick={() => onRemove(index)}
        className={cn(
          "absolute top-2 right-2 p-1 rounded-full",
          "bg-black/50 text-white hover:bg-red-500",
          "transition-all duration-200 opacity-0 group-hover:opacity-100",
          "transform group-hover:scale-100 scale-75"
        )}
        aria-label="Remove image"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-md">
        {index + 1}
      </div>
    </div>
  );
};

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photos, onRemove, onReorder }) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(photos.length / itemsPerPage);
  
  const startIndex = page * itemsPerPage;
  const displayedPhotos = photos.slice(startIndex, startIndex + itemsPerPage);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    
    const actualIndex = startIndex + index;
    const draggedActualIndex = draggedItemIndex < startIndex 
      ? draggedItemIndex 
      : draggedItemIndex >= startIndex + itemsPerPage 
        ? draggedItemIndex 
        : startIndex + draggedItemIndex;
    
    onReorder(draggedActualIndex, actualIndex);
    setDraggedItemIndex(actualIndex);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const goToNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Selected Photos ({photos.length})</h3>
        <div className="flex gap-2">
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevPage}
                disabled={page === 0}
                className={cn(
                  "p-1.5 rounded-full transition-all duration-200",
                  "hover:bg-primary/10",
                  page === 0 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"
                )}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={page >= totalPages - 1}
                className={cn(
                  "p-1.5 rounded-full transition-all duration-200",
                  "hover:bg-primary/10",
                  page >= totalPages - 1 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"
                )}
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg glass-card p-6">
        {displayedPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {displayedPhotos.map((photo, index) => (
              <PhotoItem
                key={`${photo.name}-${index}`}
                photo={photo}
                index={index}
                onRemove={(i) => onRemove(startIndex + i)}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            All photos have been uploaded
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoPreview;
