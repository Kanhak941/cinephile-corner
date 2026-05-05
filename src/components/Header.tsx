import { Link } from "@tanstack/react-router";
import { Film } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-5 w-5 text-primary" />
          <span className="font-display text-xl tracking-tight">Reelist</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Discover
          </Link>
          <Link to="/films" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Films
          </Link>
        </nav>
      </div>
    </header>
  );
}
