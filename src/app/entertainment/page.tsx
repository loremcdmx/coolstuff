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

  const tabs: {
    key: Tab;
    labelKey: "tab.all" | "tab.movies" | "tab.series" | "tab.music";
  }[] = [
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
      <main className="max-w-[1400px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_260px] gap-8">
          {/* Left sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <p
                className="text-[10px] uppercase tracking-[0.15em] mb-3 px-2"
                style={{
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Type
              </p>
              {tabs.map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTab(tb.key)}
                  className="w-full text-left px-3 py-1.5 text-[13px] transition-all"
                  style={{
                    color:
                      tab === tb.key
                        ? "var(--color-text)"
                        : "var(--color-text-secondary)",
                    fontWeight: tab === tb.key ? 600 : 400,
                    borderLeft:
                      tab === tb.key
                        ? "2px solid var(--color-accent)"
                        : "2px solid transparent",
                    background:
                      tab === tb.key
                        ? "var(--color-surface-hover)"
                        : "transparent",
                  }}
                >
                  {t(lang, tb.labelKey)}
                </button>
              ))}

              {(tab === "all" || tab === "movies" || tab === "series") && (
                <div className="mt-6">
                  <p
                    className="text-[10px] uppercase tracking-[0.15em] mb-3 px-2"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Genre
                  </p>
                  {genreKeys.map((g) => (
                    <button
                      key={g.filter}
                      onClick={() => setGenre(g.filter)}
                      className="w-full text-left px-3 py-1 text-[12px] transition-all"
                      style={{
                        color:
                          genre === g.filter
                            ? "var(--color-text)"
                            : "var(--color-text-secondary)",
                        fontWeight: genre === g.filter ? 600 : 400,
                        borderLeft:
                          genre === g.filter
                            ? "2px solid var(--color-accent)"
                            : "2px solid transparent",
                      }}
                    >
                      {t(lang, g.key)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">
                {t(lang, "entertainment")}
                <span
                  className="font-normal ml-2"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  / {country === "mx" ? t(lang, "mexico") : t(lang, "usa")}
                </span>
              </h1>
            </div>

            {/* Mobile tabs */}
            <div className="flex gap-1 mb-3 overflow-x-auto pb-1 lg:hidden">
              {tabs.map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTab(tb.key)}
                  className="px-2.5 py-1 text-xs font-medium whitespace-nowrap"
                  style={{
                    background:
                      tab === tb.key ? "var(--color-text)" : "transparent",
                    color:
                      tab === tb.key
                        ? "var(--color-bg)"
                        : "var(--color-text-secondary)",
                    border: `1px solid ${tab === tb.key ? "var(--color-text)" : "var(--color-border)"}`,
                    borderRadius: "var(--radius-sm)",
                  }}
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
                      className="px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
                      style={{
                        border: `1px solid ${genre === g.filter ? "var(--color-text)" : "var(--color-border)"}`,
                        background:
                          genre === g.filter
                            ? "var(--color-text)"
                            : "transparent",
                        color:
                          genre === g.filter
                            ? "var(--color-bg)"
                            : "var(--color-text-secondary)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {t(lang, g.key)}
                    </button>
                  ))}
                </div>

                {filteredMovies.length === 0 ? (
                  <div
                    className="text-center py-12 text-sm"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {t(lang, "noResults")}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
                    {filteredMovies.map((item, i) => (
                      <MovieCard key={item.id} item={item} index={i} />
                    ))}
                  </div>
                )}
              </>
            )}

            {(tab === "all" || tab === "music") && (
              <div>
                <h2 className="text-lg font-semibold mb-3">
                  {t(lang, "topMusic")} —{" "}
                  {country === "mx" ? t(lang, "mexico") : "USA"}
                </h2>
                <div className="max-w-xl">
                  {filteredSongs.map((song, i) => (
                    <SongCard key={song.id} song={song} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.15em] mb-3"
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  01 — Critics&apos; Picks
                </p>
                <div className="space-y-4">
                  {entEditorial.map((pick) => (
                    <a key={pick.id} href={pick.url} className="block group">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="text-[10px] font-medium uppercase tracking-[0.05em]"
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
                      <p
                        className="text-[13px] font-medium leading-snug transition-colors"
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
                      <p
                        className="text-[11px] mt-0.5 line-clamp-2 leading-relaxed"
                        style={{
                          color: "var(--color-text-tertiary)",
                          fontFamily: "var(--font-serif)",
                        }}
                      >
                        {pick.summary}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {tab !== "music" && (
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.15em] mb-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    02 — Top Music
                  </p>
                  {songs
                    .filter(
                      (s) => s.country === country || s.country === "both"
                    )
                    .slice(0, 5)
                    .map((song, i) => (
                      <a
                        key={song.id}
                        href={song.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-1.5 transition-colors"
                        style={{
                          borderBottom: "1px solid var(--color-border)",
                        }}
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
              )}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
