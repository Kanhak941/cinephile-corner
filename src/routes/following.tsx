import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/following")({
  head: () => ({
    meta: [
      { title: "Following — Reelist" },
      { name: "description", content: "Cinephiles whose taste you trust." },
      { property: "og:title", content: "Following — Reelist" },
      { property: "og:description", content: "Cinephiles whose taste you trust." },
    ],
  }),
  component: FollowingPage,
});

const people = [
  { name: "Mira Okafor", handle: "@mira", films: 412, last: "Logged Lawrence of Arabia" },
  { name: "Daichi Sato", handle: "@daichi", films: 1207, last: "Reviewed Spirited Away" },
  { name: "Lena Vasquez", handle: "@lenav", films: 88, last: "Added 3 to watchlist" },
  { name: "Theo Brandt", handle: "@theo", films: 562, last: "Liked your review" },
];

function FollowingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <UserPlus className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Following</h1>
            <p className="text-sm text-muted-foreground">{people.length} cinephiles.</p>
          </div>
        </div>
        <ul className="divide-y divide-border/60 rounded-lg border border-border/60 bg-card/50">
          {people.map((p) => (
            <li key={p.handle} className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--gold)] font-display text-lg text-primary-foreground">
                {p.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.name} <span className="text-xs text-muted-foreground">{p.handle}</span></p>
                <p className="truncate text-xs text-muted-foreground">{p.films} films · {p.last}</p>
              </div>
              <button className="shrink-0 rounded-md border border-border px-3 py-1 text-xs hover:bg-accent/40">Following</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
