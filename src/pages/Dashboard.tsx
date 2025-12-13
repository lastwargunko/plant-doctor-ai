import { useState, useEffect } from "react";
import { 
  Bug, 
  Droplets, 
  Sun, 
  Wind, 
  Leaf, 
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DashboardSkeleton } from "@/components/PageSkeleton";

// Data katalog penyakit
const diseases = [
  {
    id: 1,
    name: "Bercak Daun (Leaf Spot)",
    category: "Jamur",
    severity: "medium",
    image: "🍂",
    symptoms: ["Bercak coklat pada daun", "Daun menguning", "Daun rontok prematur"],
    plants: ["Tomat", "Cabai", "Kentang"],
  },
  {
    id: 2,
    name: "Busuk Akar (Root Rot)",
    category: "Jamur",
    severity: "high",
    image: "🌱",
    symptoms: ["Tanaman layu", "Akar berwarna hitam", "Pertumbuhan terhambat"],
    plants: ["Padi", "Jagung", "Kedelai"],
  },
  {
    id: 3,
    name: "Embun Tepung (Powdery Mildew)",
    category: "Jamur",
    severity: "low",
    image: "❄️",
    symptoms: ["Lapisan putih pada daun", "Daun menggulung", "Fotosintesis terganggu"],
    plants: ["Mentimun", "Labu", "Melon"],
  },
  {
    id: 4,
    name: "Virus Mosaik",
    category: "Virus",
    severity: "high",
    image: "🦠",
    symptoms: ["Pola mosaik pada daun", "Daun kerdil", "Buah cacat"],
    plants: ["Tomat", "Cabai", "Tembakau"],
  },
  {
    id: 5,
    name: "Layu Bakteri",
    category: "Bakteri",
    severity: "high",
    image: "💧",
    symptoms: ["Layu mendadak", "Pembuluh kecoklatan", "Lendir pada batang"],
    plants: ["Tomat", "Kentang", "Terong"],
  },
  {
    id: 6,
    name: "Karat Daun (Rust)",
    category: "Jamur",
    severity: "medium",
    image: "🟤",
    symptoms: ["Bintik oranye/coklat", "Pustula pada daun", "Daun mengering"],
    plants: ["Jagung", "Gandum", "Kedelai"],
  },
];

// Tips perawatan
const careTips = [
  {
    icon: Droplets,
    title: "Penyiraman Tepat",
    description: "Siram tanaman di pagi hari untuk mencegah jamur. Hindari menyiram daun langsung.",
  },
  {
    icon: Sun,
    title: "Pencahayaan Optimal",
    description: "Pastikan tanaman mendapat sinar matahari 6-8 jam per hari sesuai kebutuhan.",
  },
  {
    icon: Wind,
    title: "Sirkulasi Udara",
    description: "Jaga jarak tanam untuk sirkulasi udara yang baik dan mencegah penyebaran penyakit.",
  },
  {
    icon: Leaf,
    title: "Pemupukan Seimbang",
    description: "Gunakan pupuk seimbang NPK dan tambahkan kompos untuk nutrisi tanah optimal.",
  },
];

// Statistik
const stats = [
  { label: "Jenis Penyakit", value: "50+", icon: Bug },
  { label: "Tanaman Terdeteksi", value: "100+", icon: Leaf },
  { label: "Akurasi AI", value: "95%", icon: TrendingUp },
  { label: "Panduan Tersedia", value: "200+", icon: BookOpen },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "high":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getSeverityLabel = (severity: string) => {
  switch (severity) {
    case "low":
      return "Ringan";
    case "medium":
      return "Sedang";
    case "high":
      return "Berat";
    default:
      return severity;
  }
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load / check for slow network
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Selamat Datang di{" "}
              <span className="text-gradient">PlantCare AI</span>
            </h1>
            <p className="text-muted-foreground">
              Pelajari berbagai penyakit tanaman dan cara pencegahannya
            </p>
          </div>
          <Link to="/detection">
            <Button size="lg" className="shadow-glow">
              Mulai Deteksi
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-12 animate-fade-in-delay">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Disease Catalog */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Katalog Penyakit Tanaman</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diseases.map((disease, index) => (
            <Card 
              key={disease.id} 
              className="glass hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{disease.image}</span>
                    <div>
                      <CardTitle className="text-base">{disease.name}</CardTitle>
                      <CardDescription>{disease.category}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={getSeverityColor(disease.severity)}>
                    {getSeverityLabel(disease.severity)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Gejala:</p>
                    <ul className="text-sm text-foreground space-y-1">
                      {disease.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Tanaman rentan:</p>
                    <div className="flex flex-wrap gap-1">
                      {disease.plants.map((plant) => (
                        <Badge key={plant} variant="secondary" className="text-xs">
                          {plant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Care Tips */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Tips Perawatan Tanaman</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {careTips.map((tip, index) => (
            <Card 
              key={tip.title} 
              className="glass hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <tip.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 animate-fade-in">
        <Card className="glass border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Tanaman Anda Terlihat Sakit?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Upload foto tanaman Anda sekarang dan dapatkan diagnosis serta rekomendasi penanganan secara instan
            </p>
            <Link to="/detection">
              <Button size="lg" className="shadow-glow">
                Deteksi Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
