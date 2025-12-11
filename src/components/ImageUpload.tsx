import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  preview: string | null;
  onClear: () => void;
}

const ImageUpload = ({ onImageSelect, preview, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  }, [onImageSelect]);

  if (preview) {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-glow animate-scale-in">
        <img 
          src={preview} 
          alt="Preview tanaman" 
          className="w-full h-64 sm:h-80 object-cover"
        />
        <button
          onClick={onClear}
          className="absolute top-4 right-4 p-2 rounded-full bg-foreground/80 text-background 
                     hover:bg-foreground transition-colors duration-200"
          aria-label="Hapus gambar"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent">
          <p className="text-background text-sm font-medium">Gambar berhasil diunggah</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('upload-zone', isDragging && 'active')}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload gambar tanaman"
      />
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />
          <div className="relative p-5 rounded-full bg-primary/10">
            <Upload className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-foreground">
            Drag & drop gambar tanaman
          </p>
          <p className="text-sm text-muted-foreground">
            atau <span className="text-primary font-medium">klik untuk memilih</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="w-4 h-4" />
          <span>PNG, JPG, WEBP hingga 10MB</span>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
