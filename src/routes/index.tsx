import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { films } from "@/data/films";
import { FilmRow } from "@/components/FilmRow";
import { Header } from "@/components/Header";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reelist — Track films you've loved" },
      { name: "description", content: "Discover, track and celebrate the films you love. A cinephile's diary." },
      { property: "og:title", content: "Reelist — Track films you've loved" },
      { property: "og:description", content: "Discover, track and celebrate the films you love." },
    ],
  }),
  component: Index,
});

function Index() {
  const acclaimed = [...films].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const recent = [...films].filter((f) => f.year >= 2015);
  const classics = [...films].filter((f) => f.year < 2000);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Cinematic hero still"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 sm:px-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Editor's pick · A cinephile's diary
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.05] sm:text-7xl">
            Every frame, <span className="text-gradient-gold">remembered.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Discover hand-picked films across eras and genres. Track what you've watched, savour what you've loved.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              to="/films"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-[var(--shadow-glow)]"
            >
              Browse all films <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#discover" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Or scroll to discover ↓
            </a>
          </div>
        </div>
      </section>

      <main id="discover" className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        <FilmRow
          title="Most acclaimed"
          subtitle="The highest-rated films in our library."
          films={acclaimed}
        />
        <FilmRow
          title="Modern essentials"
          subtitle="Released in the last decade."
          films={recent}
        />
        <FilmRow
          title="Timeless classics"
          subtitle="Older than the internet, twice as iconic."
          films={classics}
        />
      </main>

      <footer className="border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
        Made with love for the cinema · Reelist
      </footer>
    </div>
  );
}
