import { Link } from "@tanstack/react-router";
import type { Film } from "@/data/films";
import { posters } from "@/data/posters";
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

  const img = posters[film.id];
  const [from, to] = film.palette;

  return (
    <Link
      to="/film/$id"
      params={{ id: film.id }}
      className={`group block flex-shrink-0 ${dimensions}`}
    >
      <div
        className="poster-hover relative aspect-[2/3] overflow-hidden rounded-md ring-1 ring-border bg-card"
        style={!img ? { backgroundImage: `linear-gradient(135deg, ${from}, ${to})` } : undefined}
      >
        {img ? (
          <img
            src={img}
            alt={`${film.title} poster`}
            loading="lazy"
            width={768}
            height={1152}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-end p-3">
            <p className="font-display text-base leading-tight text-white drop-shadow-md">{film.title}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/70">{film.year}</p>
          </div>
        )}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-md">
          <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
          {film.rating.toFixed(1)}
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {film.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{film.director} · {film.year}</p>
      </div>
    </Link>
  );
}
