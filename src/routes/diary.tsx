import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { films } from "@/data/films";
import { posters } from "@/data/posters";
import { BookOpen, Star } from "lucide-react";

export const Route = createFileRoute("/diary")({
  head: () => ({
    meta: [
      { title: "Diary — Reelist" },
      { name: "description", content: "A log of every film you've watched and what you thought." },
      { property: "og:title", content: "Diary — Reelist" },
      { property: "og:description", content: "A log of every film you've watched and what you thought." },
    ],
  }),
  component: DiaryPage,
});

const entries = [
  { filmId: "parasite", date: "May 03, 2026", rating: 5, note: "A second watch and somehow even sharper. Every frame earns its place." },
  { filmId: "moonlight", date: "Apr 28, 2026", rating: 4.5, note: "The middle chapter still wrecks me." },
  { filmId: "in-the-mood-for-love", date: "Apr 21, 2026", rating: 5, note: "Yumeji's Theme on loop for the rest of the night." },
  { filmId: "everything-everywhere", date: "Apr 14, 2026", rating: 4, note: "Maximalist in the best way. Hot dog fingers stay with you." },
];

function DiaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Your diary</h1>
            <p className="text-sm text-muted-foreground">Recent entries.</p>
          </div>
        </div>
        <ul className="space-y-4">
          {entries.map((e) => {
            const film = films.find((f) => f.id === e.filmId)!;
            return (
              <li key={e.date} className="flex gap-4 rounded-lg border border-border/60 bg-card/50 p-4">
                <Link to="/film/$id" params={{ id: film.id }} className="shrink-0">
                  <img src={posters[film.id]} alt={film.title} className="h-28 w-20 rounded-md object-cover ring-1 ring-border" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <Link to="/film/$id" params={{ id: film.id }} className="truncate font-display text-lg hover:text-primary">
                      {film.title} <span className="text-sm text-muted-foreground">{film.year}</span>
                    </Link>
                    <span className="shrink-0 text-xs text-muted-foreground">{e.date}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[var(--gold)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(e.rating) ? "fill-current" : "opacity-30"}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
