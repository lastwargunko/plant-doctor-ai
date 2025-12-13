import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Leaf } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              {/* Desktop: Sidebar trigger */}
              <SidebarTrigger className="hidden md:flex" />
              
              {/* Mobile: Logo */}
              <div className="flex md:hidden items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-foreground">PlantCare AI</span>
              </div>
            </div>
            
            <ThemeToggle />
          </header>
          
          {/* Main content */}
          <main className="flex-1 relative pb-20 md:pb-0">
            {/* Decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            </div>
            
            <div className="relative">
              {children}
            </div>
          </main>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>
    </SidebarProvider>
  );
}
