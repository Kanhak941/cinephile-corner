import { createFileRoute } from "@tanstack/react-router";
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

const notes: Record<string, string> = {
  "blade-runner-2049": "Roger Deakins doing the Lord's work. Joi storyline still aches.",
  "in-the-mood-for-love": "Yumeji's Theme on loop for the rest of the night.",
  "parasite": "Sharper on a rewatch. Every frame earns its place.",
  "2001": "Watched on the biggest screen I could find. The Star Gate is still otherworldly.",
  "everything-everywhere": "Maximalist in the best way. Hot dog fingers stay with you.",
  "the-godfather": "The opening wedding sequence is a film school in itself.",
  "spirited-away": "No-Face on the train. Pure cinema.",
  "mad-max-fury-road": "Practical effects > everything. The Doof Warrior rules.",
  "moonlight": "The middle chapter still wrecks me.",
  "lawrence-of-arabia": "The match cut. The desert. The score. Nothing quite like it.",
  "the-shining": "REDRUM. Watched with the lights on, no regrets.",
  "amelie": "Comfort cinema in its purest form. Paris in saturated green.",
};

const dates = [
  "May 03, 2026", "Apr 28, 2026", "Apr 21, 2026", "Apr 14, 2026",
  "Apr 07, 2026", "Mar 30, 2026", "Mar 22, 2026", "Mar 15, 2026",
  "Mar 08, 2026", "Feb 27, 2026", "Feb 18, 2026", "Feb 09, 2026",
];

function DiaryPage() {
  const entries = films.map((film, i) => ({
    film,
    date: dates[i % dates.length],
    rating: film.rating,
    note: notes[film.id] ?? "",
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Your diary</h1>
            <p className="text-sm text-muted-foreground">{entries.length} entries across every genre.</p>
          </div>
        </div>
        <ul className="space-y-4">
          {entries.map((e) => (
            <li key={e.film.id} className="flex gap-4 rounded-lg border border-border/60 bg-card/50 p-4">
              <a href={`/film/${e.film.id}`} className="shrink-0">
                <img src={posters[e.film.id]} alt={e.film.title} className="h-28 w-20 rounded-md object-cover ring-1 ring-border" />
              </a>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <a href={`/film/${e.film.id}`} className="truncate font-display text-lg hover:text-primary">
                    {e.film.title} <span className="text-sm text-muted-foreground">{e.film.year}</span>
                  </a>
                  <span className="shrink-0 text-xs text-muted-foreground">{e.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{e.film.genres.join(" · ")}</p>
                <div className="mt-1 flex items-center gap-1 text-[var(--gold)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(e.rating) ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
