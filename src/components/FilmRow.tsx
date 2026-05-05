import type { Film } from "@/data/films";
import { Poster } from "./Poster";

interface Props {
  title: string;
  subtitle?: string;
  films: Film[];
}

export function FilmRow({ title, subtitle, films }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="scrollbar-hide -mx-4 flex gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
        {films.map((f) => (
          <Poster key={f.id} film={f} />
        ))}
      </div>
    </section>
  );
}
