import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
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

const activity = [
  { who: "Mira", action: "rated", what: "Parasite", detail: "★★★★★", when: "2h ago" },
  { who: "Daichi", action: "added to watchlist", what: "Lawrence of Arabia", when: "5h ago" },
  { who: "Lena", action: "reviewed", what: "Moonlight", detail: "“Devastating and tender.”", when: "Yesterday" },
  { who: "Theo", action: "liked your review of", what: "The Shining", when: "2d ago" },
];

function FriendsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-display text-3xl tracking-tight">Friends</h1>
            <p className="text-sm text-muted-foreground">Recent activity.</p>
          </div>
        </div>
        <ul className="space-y-3">
          {activity.map((a, i) => (
            <li key={i} className="rounded-lg border border-border/60 bg-card/50 p-4">
              <p className="text-sm">
                <span className="font-medium">{a.who}</span>{" "}
                <span className="text-muted-foreground">{a.action}</span>{" "}
                <span className="font-medium">{a.what}</span>
                {a.detail && <span className="ml-2 text-[var(--gold)]">{a.detail}</span>}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{a.when}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
