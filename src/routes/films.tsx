import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { films } from "@/data/films";
import { Poster } from "@/components/Poster";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/films")({
  head: () => ({
    meta: [
      { title: "All films — Reelist" },
      { name: "description", content: "Browse the full library of curated films." },
      { property: "og:title", content: "All films — Reelist" },
      { property: "og:description", content: "Browse the full library of curated films." },
    ],
  }),
  component: FilmsPage,
});

function FilmsPage() {
  const allGenres = Array.from(new Set(films.flatMap((f) => f.genres))).sort();
  const [active, setActive] = useState<string | null>(null);

  const visible = active ? films.filter((f) => f.genres.includes(active)) : films;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Library</p>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl">All films</h1>
          <p className="mt-3 text-muted-foreground">{visible.length} titles · curated</p>
        </div>

        <div className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActive(null)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {allGenres.map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
                active === g ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {visible.map((f) => (
            <Poster key={f.id} film={f} />
          ))}
        </div>
      </main>
    </div>
  );
}
