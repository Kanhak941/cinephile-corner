import { Link } from "@tanstack/react-router";
import { Film, TrendingUp, Bookmark, BookOpen, UserPlus, Users, Settings, Compass, Clapperboard } from "lucide-react";

const navItems = [
  { to: "/", label: "Discover", icon: Compass, exact: true },
  { to: "/films", label: "Films", icon: Clapperboard, exact: false },
  { to: "/trending", label: "Trending", icon: TrendingUp, exact: false },
  { to: "/watchlist", label: "Watchlist", icon: Bookmark, exact: false },
  { to: "/diary", label: "Diary", icon: BookOpen, exact: false },
  { to: "/following", label: "Following", icon: UserPlus, exact: false },
  { to: "/friends", label: "Friends", icon: Users, exact: false },
  { to: "/settings", label: "Settings", icon: Settings, exact: false },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <Film className="h-5 w-5 text-primary" />
          <span className="font-display text-xl tracking-tight">Reelist</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto text-sm text-muted-foreground sm:gap-2">
          {navItems.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={exact ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground bg-accent/40" }}
              className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 transition-colors hover:text-foreground hover:bg-accent/30"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
