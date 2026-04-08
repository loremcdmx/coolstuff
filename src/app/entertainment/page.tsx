"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { MovieCard, SongCard } from "@/components/EntertainmentCard";
import { movies, songs } from "@/data/entertainment";
import { genreKeys, t } from "@/data/i18n";
import { useApp } from "../providers";

type Tab = "all" | "movies" | "series" | "music";

export default function EntertainmentPage() {
  const { country, lang } = useApp();
  const [tab, setTab] = useState<Tab>("all");
  const [genre, setGenre] = useState("All");

  const filteredMovies = useMemo(() => {
    let items = movies;
    if (tab === "movies") items = items.filter((m) => m.type === "movie");
    if (tab === "series") items = items.filter((m) => m.type === "series");
    if (genre !== "All")
      items = items.filter((m) => m.genre.includes(genre));
    return items.sort((a, b) => b.trendScore - a.trendScore);
  }, [tab, genre]);

  const filteredSongs = useMemo(() => {
    return songs
      .filter((s) => s.country === country || s.country === "both")
      .sort((a, b) => a.position - b.position);
  }, [country]);

  const tabs: { key: Tab; labelKey: "tab.all" | "tab.movies" | "tab.series" | "tab.music" }[] = [
    { key: "all", labelKey: "tab.all" },
    { key: "movies", labelKey: "tab.movies" },
    { key: "series", labelKey: "tab.series" },
    { key: "music", labelKey: "tab.music" },
  ];

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t(lang, "entertainment")}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t(lang, "entertainmentTrending")}
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            {t(lang, "entertainmentSubtitle")} -{" "}
            {country === "mx" ? t(lang, "mexico") : t(lang, "usa")}
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === tb.key
                  ? "bg-purple-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {t(lang, tb.labelKey)}
            </button>
          ))}
        </div>

        {(tab === "all" || tab === "movies" || tab === "series") && (
          <>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {genreKeys.map((g) => (
                <button
                  key={g.filter}
                  onClick={() => setGenre(g.filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    genre === g.filter
                      ? "bg-pink-500 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {t(lang, g.key)}
                </button>
              ))}
            </div>

            {filteredMovies.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                {t(lang, "noResults")}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                {filteredMovies.map((item) => (
                  <MovieCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}

        {(tab === "all" || tab === "music") && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              {t(lang, "topMusic")} -{" "}
              {country === "mx" ? t(lang, "mexico") : "USA"}
            </h2>
            <div className="grid gap-2 max-w-2xl">
              {filteredSongs.map((song, i) => (
                <SongCard key={song.id} song={song} index={i} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
