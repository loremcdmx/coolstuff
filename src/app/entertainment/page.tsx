"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { MovieCard, SongCard } from "@/components/EntertainmentCard";
import { movies, songs } from "@/data/entertainment";
import { editorialPicks } from "@/data/editorial";
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
    if (genre !== "All") items = items.filter((m) => m.genre.includes(genre));
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

  const entEditorial = editorialPicks.filter((e) =>
    ["Entertainment", "Music"].includes(e.category)
  );

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_280px] gap-6">
          {/* Left sidebar - filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-400 mb-2 px-2">
                  Type
                </p>
                {tabs.map((tb) => (
                  <button
                    key={tb.key}
                    onClick={() => setTab(tb.key)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                      tab === tb.key
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {t(lang, tb.labelKey)}
                  </button>
                ))}
              </div>

              {(tab === "all" || tab === "movies" || tab === "series") && (
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-400 mb-2 px-2">
                    Genre
                  </p>
                  {genreKeys.map((g) => (
                    <button
                      key={g.filter}
                      onClick={() => setGenre(g.filter)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                        genre === g.filter
                          ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {t(lang, g.key)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div>
            <div className="mb-4">
              <h1 className="text-xl font-bold">
                {t(lang, "entertainment")}{" "}
                <span className="text-zinc-400 font-normal">
                  / {country === "mx" ? t(lang, "mexico") : t(lang, "usa")}
                </span>
              </h1>
            </div>

            {/* Mobile filters */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 lg:hidden">
              {tabs.map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTab(tb.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    tab === tb.key
                      ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {t(lang, tb.labelKey)}
                </button>
              ))}
            </div>

            {(tab === "all" || tab === "movies" || tab === "series") && (
              <>
                {/* Mobile genre pills */}
                <div className="flex gap-1 mb-4 overflow-x-auto pb-1 lg:hidden">
                  {genreKeys.map((g) => (
                    <button
                      key={g.filter}
                      onClick={() => setGenre(g.filter)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${
                        genre === g.filter
                          ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
                    {filteredMovies.map((item) => (
                      <MovieCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </>
            )}

            {(tab === "all" || tab === "music") && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  {t(lang, "topMusic")} — {country === "mx" ? t(lang, "mexico") : "USA"}
                </h2>
                <div className="grid gap-1.5 max-w-xl">
                  {filteredSongs.map((song, i) => (
                    <SongCard key={song.id} song={song} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-purple-500 rounded-full" />
                  Critics' Picks
                </h3>
                <div className="space-y-2.5">
                  {entEditorial.map((pick) => (
                    <a key={pick.id} href={pick.url} className="block group">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold text-zinc-500">{pick.source}</span>
                        <span className="text-[10px] text-zinc-400">· {pick.date}</span>
                      </div>
                      <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                        {pick.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                        {pick.summary}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {tab !== "music" && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  <h3 className="text-sm font-semibold mb-2">
                    Top Music
                  </h3>
                  <div className="space-y-1.5">
                    {songs
                      .filter((s) => s.country === country || s.country === "both")
                      .slice(0, 5)
                      .map((song, i) => (
                        <a
                          key={song.id}
                          href={song.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-1 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <span className="text-xs font-bold text-zinc-400 w-4 text-right">
                            {i + 1}
                          </span>
                          <div className="w-7 h-7 rounded overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={song.cover} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-zinc-800 dark:text-white truncate">{song.title}</p>
                            <p className="text-[10px] text-zinc-500 truncate">{song.artist}</p>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
