import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Poster } from "@/components/Poster";
import { films } from "@/data/films";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/trending")({
  head: () => ({
    meta: [
      { title: "Trending — Reelist" },
      { name: "description", content: "Films heating up across the Reelist community this week." },
      { property: "og:title", content: "Trending — Reelist" },
      { property: "og:description", content: "Films heating up across the Reelist community this week." },
    ],
  }),
  component: TrendingPage,
});

function TrendingPage() {
  const trending = [...films].sort((a, b) => b.rating - a.rating).slice(0, 8);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Trending this week</h1>
            <p className="text-sm text-muted-foreground">What cinephiles are logging right now.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {trending.map((film, i) => (
            <div key={film.id} className="relative">
              <span className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm text-primary-foreground shadow-lg">
                {i + 1}
              </span>
              <Poster film={film} size="sm" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
