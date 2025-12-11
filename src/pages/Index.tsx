import { useState, useCallback } from 'react';
import { Leaf, Sparkles, ScanLine } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import DetectionResult from '@/components/DetectionResult';
import { Button } from '@/components/ui/button';

// Mock detection result - in real app, this would come from an API
const mockDetectionResult = {
  disease: 'Bercak Daun (Leaf Spot)',
  confidence: 94,
  severity: 'medium' as const,
  description: 'Bercak daun adalah penyakit yang disebabkan oleh jamur atau bakteri yang menyerang jaringan daun. Penyakit ini umum terjadi pada kondisi kelembaban tinggi dan dapat menyebar dengan cepat jika tidak ditangani.',
  symptoms: [
    'Munculnya bercak coklat atau hitam pada permukaan daun',
    'Bercak memiliki tepi yang jelas dan tengah yang lebih terang',
    'Daun menguning di sekitar area yang terinfeksi',
    'Daun yang parah terinfeksi dapat gugur prematur',
  ],
  treatment: [
    'Pangkas dan buang daun yang terinfeksi untuk mencegah penyebaran',
    'Aplikasikan fungisida berbahan aktif mankozeb atau tembaga',
    'Kurangi kelembaban dengan memperbaiki sirkulasi udara',
    'Hindari penyiraman dari atas, siram langsung ke tanah',
    'Jaga kebersihan area sekitar tanaman dari sisa-sisa tanaman yang terinfeksi',
  ],
};

const Index = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockDetectionResult | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleClear = useCallback(() => {
    setPreview(null);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setResult(mockDetectionResult);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">PlantCare AI</h1>
                <p className="text-xs text-muted-foreground">Deteksi Penyakit Tanaman</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="container max-w-5xl mx-auto px-4 pt-12 pb-8">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Deteksi Penyakit Tanaman{' '}
              <span className="text-gradient">dengan Cepat</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Upload foto tanaman Anda dan dapatkan diagnosis serta rekomendasi penanganan secara instan
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="container max-w-5xl mx-auto px-4 pb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6 animate-fade-in-delay">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload Gambar</h3>
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
                <h3 className="text-lg font-semibold text-foreground mb-2">Hasil Deteksi</h3>
                <p className="text-sm text-muted-foreground">
                  Informasi penyakit dan cara penanganannya
                </p>
              </div>
              
              <DetectionResult result={result} isLoading={isAnalyzing} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-muted/30">
          <div className="container max-w-5xl mx-auto px-4 py-6">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 PlantCare AI. Membantu petani Indonesia mendeteksi penyakit tanaman.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
