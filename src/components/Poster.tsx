import { Link } from "@tanstack/react-router";
import type { Film } from "@/data/films";
import { Star } from "lucide-react";

interface Props {
  film: Film;
  size?: "sm" | "md" | "lg";
}

export function Poster({ film, size = "md" }: Props) {
  const dimensions = {
    sm: "w-32 sm:w-36",
    md: "w-40 sm:w-48",
    lg: "w-56 sm:w-64",
  }[size];

  return (
    <Link
      to="/film/$id"
      params={{ id: film.id }}
      className={`group block flex-shrink-0 ${dimensions}`}
    >
      <div
        className="poster-hover relative aspect-[2/3] overflow-hidden rounded-md ring-1 ring-border"
        style={{
          backgroundImage: `linear-gradient(135deg, ${film.palette[0]} 0%, ${film.palette[1]} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,oklch(0_0_0/0.5)_100%)]" />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
            {film.genres[0]}
          </div>
          <div>
            <h3 className="font-display text-xl leading-tight text-white drop-shadow-lg">
              {film.title}
            </h3>
            <p className="mt-1 text-xs text-white/80">{film.year}</p>
          </div>
        </div>
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs text-white backdrop-blur-md">
          <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
          {film.rating.toFixed(1)}
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {film.title}
        </p>
        <p className="text-xs text-muted-foreground">{film.director}</p>
      </div>
    </Link>
  );
}
