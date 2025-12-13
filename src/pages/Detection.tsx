import { useState, useCallback, useEffect } from 'react';
import { Sparkles, ScanLine, HelpCircle } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import DetectionResult from '@/components/DetectionResult';
import { Button } from '@/components/ui/button';
import { detectPlantDisease, DetectionResponse } from '@/services/plantApi';
import { toast } from 'sonner';
import { DetectionGuide } from '@/components/DetectionGuide';
import { DetectionSkeleton } from '@/components/PageSkeleton';

const GUIDE_SHOWN_KEY = 'plantcare_guide_shown';

const Detection = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResponse | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Show guide if first time
      const guideShown = localStorage.getItem(GUIDE_SHOWN_KEY);
      if (!guideShown) {
        setShowGuide(true);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGuideComplete = () => {
    localStorage.setItem(GUIDE_SHOWN_KEY, 'true');
  };

  const handleImageSelect = useCallback((file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleClear = useCallback(() => {
    setPreview(null);
    setSelectedFile(null);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    try {
      const response = await detectPlantDisease(selectedFile);
      setResult(response);
    } catch (error) {
      console.error('Detection error:', error);
      toast.error('Gagal menganalisis gambar. Pastikan server API aktif.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedFile]);

  if (isLoading) {
    return <DetectionSkeleton />;
  }

  return (
    <>
      <DetectionGuide 
        open={showGuide} 
        onOpenChange={setShowGuide}
        onComplete={handleGuideComplete}
      />
      
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="pb-8">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              Deteksi Penyakit Tanaman{' '}
              <span className="text-gradient">dengan Cepat</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Upload foto tanaman Anda dan dapatkan diagnosis serta rekomendasi penanganan secara instan
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowGuide(true)}
              className="gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              Lihat Panduan
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6 animate-fade-in-delay">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Upload Gambar</h2>
              <p className="text-sm text-muted-foreground">
                Ambil foto daun atau bagian tanaman yang ingin dianalisis
              </p>
            </div>
            
            <ImageUpload
              onImageSelect={handleImageSelect}
              preview={preview}
              onClear={handleClear}
            />

            {preview && (
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full h-12 text-base font-semibold shadow-glow"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <ScanLine className="w-5 h-5 mr-2 animate-pulse" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <ScanLine className="w-5 h-5 mr-2" />
                    Analisis Sekarang
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Result Section */}
          <div className="space-y-6 animate-fade-in-delay" style={{ animationDelay: '0.3s' }}>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Hasil Deteksi</h2>
              <p className="text-sm text-muted-foreground">
                Informasi penyakit dan cara penanganannya
              </p>
            </div>
            
            <DetectionResult result={result} isLoading={isAnalyzing} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Detection;
