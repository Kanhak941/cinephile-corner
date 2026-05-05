import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Poster } from "@/components/Poster";
import { films } from "@/data/films";
import { Bookmark } from "lucide-react";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "Watchlist — Reelist" },
      { name: "description", content: "Films you've saved to watch later." },
      { property: "og:title", content: "Watchlist — Reelist" },
      { property: "og:description", content: "Films you've saved to watch later." },
    ],
  }),
  component: WatchlistPage,
});

function WatchlistPage() {
  const saved = films;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <Bookmark className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Your watchlist</h1>
            <p className="text-sm text-muted-foreground">{saved.length} films queued up across every genre.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {saved.map((film) => (
            <Poster key={film.id} film={film} size="sm" />
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Browse the full <Link to="/films" className="text-primary hover:underline">library</Link> to refine.
        </p>
      </main>
    </div>
  );
}
