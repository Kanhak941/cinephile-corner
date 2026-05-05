import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { films } from "@/data/films";
import { Poster } from "@/components/Poster";
import { Header } from "@/components/Header";

const sortOptions = [
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "shortest", label: "Shortest runtime" },
  { value: "title", label: "A–Z" },
] as const;

const searchSchema = z.object({
  genre: fallback(z.string().optional(), undefined),
  sort: fallback(z.enum(["rating", "newest", "oldest", "shortest", "title"]), "rating").default("rating"),
});

export const Route = createFileRoute("/films")({
  validateSearch: zodValidator(searchSchema),
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
  const { genre, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/films" });
  const allGenres = Array.from(new Set(films.flatMap((f) => f.genres))).sort();

  const filtered = genre ? films.filter((f) => f.genres.includes(genre)) : films;
  const visible = [...filtered].sort((a, b) => {
    switch (sort) {
      case "rating": return b.rating - a.rating;
      case "newest": return b.year - a.year;
      case "oldest": return a.year - b.year;
      case "shortest": return a.runtime - b.runtime;
      case "title": return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Library</p>
            <h1 className="mt-2 font-display text-4xl sm:text-6xl">All films</h1>
            <p className="mt-3 text-muted-foreground">{visible.length} titles · curated</p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-xs uppercase tracking-wider text-muted-foreground">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) =>
                navigate({
                  search: (prev) => ({ ...prev, sort: e.target.value as typeof sort }),
                })
              }
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto pb-2">
          <Link
            to="/films"
            search={(prev) => ({ ...prev, genre: undefined })}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !genre ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </Link>
          {allGenres.map((g) => (
            <Link
              key={g}
              to="/films"
              search={(prev) => ({ ...prev, genre: g })}
              className={`rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
                genre === g ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </Link>
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
