import { Home, ScanLine } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Deteksi", url: "/detection", icon: ScanLine },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around h-16">
          {menuItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors"
              activeClassName="text-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
