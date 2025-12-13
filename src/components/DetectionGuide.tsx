import { useState } from "react";
import { X, Upload, ScanLine, CheckCircle, ArrowRight, ArrowLeft, Camera, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const steps = [
  {
    icon: Camera,
    title: "Ambil Foto Tanaman",
    description: "Foto bagian tanaman yang terlihat sakit atau bergejala. Pastikan gambar jelas dan fokus pada area yang bermasalah.",
    tip: "Tips: Gunakan pencahayaan yang cukup dan hindari bayangan berlebih",
    image: "📸",
  },
  {
    icon: Upload,
    title: "Upload Gambar",
    description: "Klik area upload atau drag & drop gambar Anda. Format yang didukung: JPG, PNG, WEBP.",
    tip: "Tips: Ukuran gambar maksimal 10MB untuk hasil terbaik",
    image: "📤",
  },
  {
    icon: ScanLine,
    title: "Mulai Analisis",
    description: "Klik tombol 'Analisis Sekarang' dan tunggu beberapa detik. AI kami akan mengidentifikasi penyakit dari gambar.",
    tip: "Tips: Proses analisis membutuhkan koneksi internet",
    image: "🔍",
  },
  {
    icon: CheckCircle,
    title: "Lihat Hasil",
    description: "Hasil deteksi akan menampilkan nama penyakit, tingkat keparahan, gejala, dan rekomendasi penanganan.",
    tip: "Tips: Simpan hasil untuk referensi di kemudian hari",
    image: "✅",
  },
];

interface DetectionGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function DetectionGuide({ open, onOpenChange, onComplete }: DetectionGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      onOpenChange(false);
      setCurrentStep(0);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    onComplete();
    onOpenChange(false);
    setCurrentStep(0);
  };
  
  const step = steps[currentStep];
  const StepIcon = step.icon;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              Panduan Deteksi
            </DialogTitle>
          </div>
          <DialogDescription>
            Langkah {currentStep + 1} dari {steps.length}
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-4">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                idx <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        
        {/* Step content */}
        <div className="text-center py-6">
          <div className="text-6xl mb-4">{step.image}</div>
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
            <StepIcon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
          <p className="text-muted-foreground mb-4">{step.description}</p>
          <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
            💡 {step.tip}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground"
          >
            Lewati
          </Button>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrev}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Kembali
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentStep < steps.length - 1 ? (
                <>
                  Lanjut
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Mulai Deteksi
                  <CheckCircle className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
