"use client";

import { useMemo, useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { MovieCard, SongCard } from "@/components/EntertainmentCard";
import { products } from "@/data/products";
import { movies, songs } from "@/data/entertainment";
import { editorialPicks } from "@/data/editorial";
import { getProfile, UserProfile } from "@/lib/profile";
import { useApp } from "../providers";
import Link from "next/link";

const interestToCategory: Record<string, string[]> = {
  tech: ["Tech"],
  fashion: ["Fashion"],
  beauty: ["Beauty"],
  home: ["Home"],
  kitchen: ["Kitchen"],
  sports: ["Sports"],
  gaming: ["Gaming"],
  books: ["Books"],
  pets: ["Pets"],
};

const entertainmentToGenre: Record<string, string[]> = {
  action: ["Action", "Thriller"],
  comedy: ["Comedy"],
  drama: ["Drama"],
  scifi: ["Sci-Fi", "Adventure"],
  superhero: ["Superhero"],
  mystery: ["Mystery"],
};

export default function ForYouPage() {
  const { country } = useApp();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const recommendedProducts = useMemo(() => {
    if (!profile) return [];
    const cats = profile.interests.flatMap((i) => interestToCategory[i] || []);
    const topCats = Object.entries(profile.categoryClicks)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([k]) => k);
    const allCats = [...new Set([...cats, ...topCats])];

    if (allCats.length === 0) {
      return products
        .filter((p) => p.country === country || p.country === "both")
        .sort((a, b) => b.trendScore - a.trendScore)
        .slice(0, 10);
    }

    return products
      .filter((p) => p.country === country || p.country === "both")
      .map((p) => ({
        ...p,
        score: allCats.includes(p.category) ? p.trendScore + 20 : p.trendScore,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [profile, country]);

  const recommendedMovies = useMemo(() => {
    if (!profile) return [];
    const genres = profile.entertainment.flatMap(
      (e) => entertainmentToGenre[e] || []
    );
    if (genres.length === 0) {
      return movies.sort((a, b) => b.trendScore - a.trendScore).slice(0, 6);
    }
    return movies
      .map((m) => ({
        ...m,
        score: m.genre.some((g) => genres.includes(g))
          ? m.trendScore + 20
          : m.trendScore,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [profile]);

  const recommendedSongs = useMemo(() => {
    return songs
      .filter((s) => s.country === country || s.country === "both")
      .slice(0, 5);
  }, [country]);

  const relevantEditorial = useMemo(() => {
    if (!profile) return editorialPicks.slice(0, 4);
    const cats = profile.interests.flatMap((i) => interestToCategory[i] || []);
    if (cats.length === 0) return editorialPicks.slice(0, 4);
    return editorialPicks
      .sort((a, b) => {
        const aMatch = cats.includes(a.category) ? 1 : 0;
        const bMatch = cats.includes(b.category) ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 4);
  }, [profile]);

  if (!profile) return null;

  if (!profile.completedQuiz) {
    return (
      <>
        <Header />
        <main className="max-w-md mx-auto px-5 py-20 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Personalize your feed
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
            Take a quick quiz so we can show you things you&apos;ll actually care about.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-6 py-2.5 text-sm font-medium transition-opacity"
            style={{
              background: "var(--color-text)",
              color: "var(--color-bg)",
              borderRadius: "var(--radius-card)",
            }}
          >
            Start quiz
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">For You</h1>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Picks based on your interests and activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main */}
          <div className="space-y-10">
            {/* Editorial */}
            <section>
              <p
                className="text-[10px] uppercase tracking-[0.15em] mb-4"
                style={{
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                01 — Editor&apos;s Picks
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relevantEditorial.map((pick) => (
                  <a
                    key={pick.id}
                    href={pick.url}
                    className="group flex gap-3 p-3 transition-colors"
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-card)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-border-strong)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-border)")
                    }
                  >
                    <div
                      className="w-20 h-20 overflow-hidden shrink-0"
                      style={{
                        borderRadius: "var(--radius-sm)",
                        background: "var(--color-surface-hover)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pick.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="text-[10px] font-medium uppercase"
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {pick.source}
                        </span>
                        <span
                          className="text-[10px]"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          · {pick.date}
                        </span>
                      </div>
                      <h3
                        className="text-sm font-medium leading-snug mb-1 line-clamp-2 transition-colors"
                        style={{ color: "var(--color-text)" }}
                      >
                        {pick.title}
                      </h3>
                      <p
                        className="text-[11px] line-clamp-2 leading-relaxed"
                        style={{
                          color: "var(--color-text-tertiary)",
                          fontFamily: "var(--font-serif)",
                        }}
                      >
                        {pick.summary}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Products */}
            <section>
              <p
                className="text-[10px] uppercase tracking-[0.15em] mb-4"
                style={{
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                02 — Recommended Products
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {recommendedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>

            {/* Movies */}
            <section>
              <p
                className="text-[10px] uppercase tracking-[0.15em] mb-4"
                style={{
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                03 — Movies & Series For You
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {recommendedMovies.map((m, i) => (
                  <MovieCard key={m.id} item={m} index={i} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Profile */}
              <div
                className="p-4"
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.15em] mb-3"
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Your Profile
                </p>
                <div className="space-y-3">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.12em] mb-1"
                      style={{
                        color: "var(--color-text-tertiary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Interests
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {profile.interests.map((i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium capitalize px-1.5 py-0.5"
                          style={{
                            background: "var(--color-accent-subtle)",
                            color: "var(--color-accent)",
                            borderRadius: "var(--radius-sm)",
                          }}
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.12em] mb-1"
                      style={{
                        color: "var(--color-text-tertiary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Entertainment
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {profile.entertainment.map((e) => (
                        <span
                          key={e}
                          className="text-[10px] font-medium capitalize px-1.5 py-0.5"
                          style={{
                            background: "var(--color-surface-hover)",
                            color: "var(--color-text-secondary)",
                            borderRadius: "var(--radius-sm)",
                          }}
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.12em] mb-1"
                      style={{
                        color: "var(--color-text-tertiary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Budget
                    </p>
                    <span
                      className="text-[11px] capitalize"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {profile.priceRange || "Not set"}
                    </span>
                  </div>
                </div>
                <Link
                  href="/quiz"
                  className="block mt-3 text-xs transition-colors"
                  style={{ color: "var(--color-accent)" }}
                >
                  Retake quiz
                </Link>
              </div>

              {/* Music */}
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.15em] mb-3"
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Top Music
                </p>
                {recommendedSongs.map((song, i) => (
                  <a
                    key={song.id}
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5"
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                  >
                    <span
                      className="text-xs font-medium w-4 text-right"
                      style={{
                        color: "var(--color-text-tertiary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="w-6 h-6 overflow-hidden shrink-0"
                      style={{ borderRadius: "var(--radius-sm)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={song.cover}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-xs font-medium truncate"
                        style={{ color: "var(--color-text)" }}
                      >
                        {song.title}
                      </p>
                      <p
                        className="text-[10px] truncate"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {song.artist}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* More editorial */}
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.15em] mb-3"
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  More from editors
                </p>
                <div className="space-y-3">
                  {editorialPicks.slice(4).map((pick) => (
                    <a key={pick.id} href={pick.url} className="block group">
                      <span
                        className="text-[10px]"
                        style={{
                          color: "var(--color-text-tertiary)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {pick.source} · {pick.date}
                      </span>
                      <p
                        className="text-xs font-medium leading-snug transition-colors"
                        style={{ color: "var(--color-text)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--color-accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--color-text)")
                        }
                      >
                        {pick.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
