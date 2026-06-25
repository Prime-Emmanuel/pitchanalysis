import { Link, useLocation } from "react-router-dom";
import { Activity, Calendar, Info, Home, Wifi } from "lucide-react";
import { cn } from "../lib/utils";

export function NavBar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Today's Matches", path: "/today", icon: Calendar },
    { name: "API Status", path: "/test", icon: Wifi },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-hover bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Activity className="h-5 w-5 text-primary" />
          <span>PitchAnalytics</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-text-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
