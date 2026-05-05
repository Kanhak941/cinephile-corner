import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { filmsById, films } from "@/data/films";
import { Header } from "@/components/Header";
import { Poster } from "@/components/Poster";
import { Star, Clock, Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/film/$id")({
  loader: ({ params }) => {
    const film = filmsById[params.id];
    if (!film) throw notFound();
    return { film };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.film.title} (${loaderData.film.year}) — Reelist` },
          { name: "description", content: loaderData.film.tagline },
          { property: "og:title", content: `${loaderData.film.title} — Reelist` },
          { property: "og:description", content: loaderData.film.synopsis },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Film not found</h1>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">← Back home</Link>
      </div>
    </div>
  ),
  component: FilmDetail,
});

function FilmDetail() {
  const { film } = Route.useLoaderData();
  const related = films.filter((f) => f.id !== film.id && f.genres.some((g) => film.genres.includes(g))).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Backdrop */}
      <div
        className="relative h-[60vh] min-h-[420px] w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${film.palette[0]} 0%, ${film.palette[1]} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0_0_0/0.4)_70%)]" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <main className="mx-auto -mt-48 max-w-7xl px-4 sm:px-6">
        <Link to="/films" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to films
        </Link>

        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          {/* Poster */}
          <div
            className="relative aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-lg ring-1 ring-border"
            style={{
              backgroundImage: `linear-gradient(135deg, ${film.palette[0]} 0%, ${film.palette[1]} 100%)`,
              boxShadow: "var(--shadow-poster), var(--shadow-glow)",
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                {film.genres[0]}
              </div>
              <div>
                <h2 className="font-display text-3xl leading-tight text-white">{film.title}</h2>
                <p className="mt-1 text-sm text-white/80">{film.year}</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                Directed by {film.director}
              </p>
              <h1 className="mt-2 font-display text-5xl sm:text-6xl">{film.title}</h1>
              <p className="mt-3 text-lg italic text-muted-foreground">"{film.tagline}"</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {film.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {film.runtime} min
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                <span className="text-foreground font-medium">{film.rating.toFixed(1)}</span> / 5
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {film.genres.map((g) => (
                <span key={g} className="rounded-full border border-border px-3 py-1 text-xs">
                  {g}
                </span>
              ))}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Synopsis</h3>
              <p className="max-w-2xl text-base leading-relaxed">{film.synopsis}</p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Cast</h3>
              <p>{film.cast.join(" · ")}</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-border/60 pt-16">
            <h2 className="mb-8 font-display text-3xl">You may also like</h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-6">
              {related.map((f) => (
                <Poster key={f.id} film={f} size="sm" />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-24 border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
        Reelist · for the love of film
      </footer>
    </div>
  );
}
