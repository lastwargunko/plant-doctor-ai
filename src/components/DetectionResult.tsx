import { AlertTriangle, CheckCircle2, Leaf, Droplets, Bug, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetectionResultProps {
  result: {
    disease: string;
    confidence: number;
    severity: 'healthy' | 'low' | 'medium' | 'high';
    description: string;
    symptoms: string[];
    treatment: string[];
  } | null;
  isLoading: boolean;
}

const severityConfig = {
  healthy: {
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/30',
    icon: CheckCircle2,
    label: 'Sehat',
  },
  low: {
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    icon: Leaf,
    label: 'Ringan',
  },
  medium: {
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    icon: AlertTriangle,
    label: 'Sedang',
  },
  high: {
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: AlertTriangle,
    label: 'Parah',
  },
};

const DetectionResult = ({ result, isLoading }: DetectionResultProps) => {
  if (isLoading) {
    return (
      <div className="result-card animate-pulse">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-muted rounded-lg w-3/4" />
            <div className="h-4 bg-muted rounded-lg w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded-lg w-full" />
          <div className="h-4 bg-muted rounded-lg w-5/6" />
          <div className="h-4 bg-muted rounded-lg w-4/6" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-card text-center py-12">
        <div className="inline-flex p-4 rounded-2xl bg-muted/50 mb-4">
          <Leaf className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Belum ada hasil deteksi
        </h3>
        <p className="text-muted-foreground text-sm">
          Upload gambar tanaman untuk memulai analisis
        </p>
      </div>
    );
  }

  const config = severityConfig[result.severity];
  const Icon = config.icon;

  return (
    <div className="result-card animate-slide-up">
      {/* Header */}
      <div className={cn('flex items-start gap-4 mb-6 pb-6 border-b border-border')}>
        <div className={cn('p-3 rounded-2xl', config.bg)}>
          <Icon className={cn('w-8 h-8', config.color)} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-foreground">{result.disease}</h3>
            <span className={cn(
              'px-2.5 py-0.5 rounded-full text-xs font-semibold',
              config.bg, config.color
            )}>
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Tingkat kepercayaan:</span>
            <span className="font-semibold text-foreground">{result.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-foreground/80 leading-relaxed">{result.description}</p>
      </div>

      {/* Symptoms */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Bug className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">Gejala</h4>
        </div>
        <ul className="space-y-2">
          {result.symptoms.map((symptom, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              {symptom}
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="w-5 h-5 text-accent" />
          <h4 className="font-semibold text-foreground">Penanganan</h4>
        </div>
        <ul className="space-y-2">
          {result.treatment.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-foreground/70">
              <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetectionResult;
