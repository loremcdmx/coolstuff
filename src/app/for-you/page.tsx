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
        score: allCats.includes(p.category)
          ? p.trendScore + 20
          : p.trendScore,
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
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-3">
            Personalize your experience
          </h1>
          <p className="text-zinc-400 mb-6">
            Take a quick quiz so we can show you things you'll actually care about.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition-colors"
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
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">For You</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Picks based on your interests and activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Main column */}
          <div className="space-y-8">
            {/* Editorial picks */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-amber-500 rounded-full" />
                Editor's Picks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relevantEditorial.map((pick) => (
                  <a
                    key={pick.id}
                    href={pick.url}
                    className="group flex gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pick.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded">
                          {pick.sourceIcon}
                        </span>
                        <span className="text-[11px] text-zinc-500">{pick.source}</span>
                        <span className="text-[11px] text-zinc-500">·</span>
                        <span className="text-[11px] text-zinc-500">{pick.date}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-tight mb-1 line-clamp-2">
                        {pick.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {pick.summary}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Recommended products */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-500 rounded-full" />
                Recommended Products
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>

            {/* Movies & Series */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-full" />
                Movies & Series For You
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {recommendedMovies.map((m) => (
                  <MovieCard key={m.id} item={m} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Profile summary */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-3">Your Profile</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1">Interests</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.map((i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full capitalize"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1">Entertainment</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.entertainment.map((e) => (
                      <span
                        key={e}
                        className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full capitalize"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1">Budget</p>
                  <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full capitalize">
                    {profile.priceRange || "Not set"}
                  </span>
                </div>
              </div>
              <Link
                href="/quiz"
                className="block mt-3 text-xs text-amber-600 dark:text-amber-400 hover:underline"
              >
                Retake quiz
              </Link>
            </div>

            {/* Top music sidebar */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-3">Top Music</h3>
              <div className="space-y-1.5">
                {recommendedSongs.map((song, i) => (
                  <a
                    key={song.id}
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <span className="text-sm font-bold text-zinc-400 w-5 text-right">
                      {i + 1}
                    </span>
                    <div className="w-8 h-8 rounded overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={song.cover} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">
                        {song.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate">{song.artist}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* More editorial */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-3">More from editors</h3>
              <div className="space-y-2.5">
                {editorialPicks.slice(4).map((pick) => (
                  <a
                    key={pick.id}
                    href={pick.url}
                    className="block group"
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-zinc-500">{pick.source}</span>
                      <span className="text-[10px] text-zinc-500">· {pick.date}</span>
                    </div>
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {pick.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
