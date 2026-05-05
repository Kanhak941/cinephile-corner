import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Poster } from "@/components/Poster";
import { films } from "@/data/films";
import { TrendingUp, Flame } from "lucide-react";

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

// Pseudo-random but stable shuffle so every film appears in trending
function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function TrendingPage() {
  const trending = shuffle(films, 7);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Trending this week</h1>
            <p className="text-sm text-muted-foreground">{trending.length} films cinephiles are logging right now.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {trending.map((film, i) => (
            <div key={film.id} className="relative">
              <span className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm text-primary-foreground shadow-lg">
                {i + 1}
              </span>
              {i < 3 && (
                <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-[var(--gold)]/90 px-2 py-0.5 text-[10px] font-medium text-black">
                  <Flame className="h-3 w-3" /> Hot
                </span>
              )}
              <Poster film={film} size="sm" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
