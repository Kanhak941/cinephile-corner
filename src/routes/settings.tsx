import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Reelist" },
      { name: "description", content: "Manage your Reelist preferences." },
      { property: "og:title", content: "Settings — Reelist" },
      { property: "og:description", content: "Manage your Reelist preferences." },
    ],
  }),
  component: SettingsPage,
});

function Row({ label, hint, control }: { label: string; hint: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-4 last:border-0">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      {control}
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h1 className="font-display text-3xl tracking-tight">Settings</h1>
        </div>

        <section className="rounded-lg border border-border/60 bg-card/50 p-6">
          <h2 className="mb-2 font-display text-lg">Profile</h2>
          <Row label="Display name" hint="Shown on reviews and your diary." control={
            <input defaultValue="Cinephile" className="w-44 rounded-md border border-border bg-background px-3 py-1.5 text-sm" />
          } />
          <Row label="Username" hint="Your unique handle." control={
            <input defaultValue="@you" className="w-44 rounded-md border border-border bg-background px-3 py-1.5 text-sm" />
          } />
        </section>

        <section className="mt-6 rounded-lg border border-border/60 bg-card/50 p-6">
          <h2 className="mb-2 font-display text-lg">Preferences</h2>
          <Row label="Default sort" hint="How films are ordered by default." control={
            <select className="rounded-md border border-border bg-background px-3 py-1.5 text-sm">
              <option>Top rated</option><option>Newest</option><option>A–Z</option>
            </select>
          } />
          <Row label="Spoiler-safe reviews" hint="Hide reviews tagged as spoilers." control={
            <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
          } />
          <Row label="Email digest" hint="Weekly recap of friends' activity." control={
            <input type="checkbox" className="h-5 w-5 accent-primary" />
          } />
        </section>

        <button className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Save changes
        </button>
      </main>
    </div>
  );
}
