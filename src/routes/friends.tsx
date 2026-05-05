import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { films } from "@/data/films";
import { Users } from "lucide-react";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends — Reelist" },
      { name: "description", content: "Recent activity from your friends." },
      { property: "og:title", content: "Friends — Reelist" },
      { property: "og:description", content: "Recent activity from your friends." },
    ],
  }),
  component: FriendsPage,
});

const friends = ["Mira", "Daichi", "Lena", "Theo", "Priya", "Marco", "Aïsha", "Jonas", "Sofía", "Henrik", "Wei", "Naledi"];
const actions = [
  { verb: "rated", detail: (r: number) => "★".repeat(Math.round(r)) },
  { verb: "added to watchlist", detail: () => "" },
  { verb: "reviewed", detail: () => "“Stayed with me for days.”" },
  { verb: "rewatched", detail: () => "" },
  { verb: "liked your review of", detail: () => "" },
];
const whens = ["just now", "2h ago", "5h ago", "Yesterday", "2d ago", "3d ago", "Last week"];

function FriendsPage() {
  const feed = films.map((film, i) => {
    const a = actions[i % actions.length];
    return {
      who: friends[i % friends.length],
      action: a.verb,
      what: film.title,
      detail: a.detail(film.rating),
      when: whens[i % whens.length],
      genres: film.genres,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Friends</h1>
            <p className="text-sm text-muted-foreground">{feed.length} recent activities across every genre.</p>
          </div>
        </div>
        <ul className="space-y-3">
          {feed.map((a, i) => (
            <li key={i} className="rounded-lg border border-border/60 bg-card/50 p-4">
              <p className="text-sm">
                <span className="font-medium">{a.who}</span>{" "}
                <span className="text-muted-foreground">{a.action}</span>{" "}
                <span className="font-medium">{a.what}</span>
                {a.detail && <span className="ml-2 text-[var(--gold)]">{a.detail}</span>}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{a.genres.join(" · ")} · {a.when}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
