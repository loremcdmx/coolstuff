"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { MovieCard, SongCard } from "@/components/EntertainmentCard";
import {
  movies,
  songs,
  entertainmentGenres,
} from "@/data/entertainment";
import { useCountry } from "../providers";

type Tab = "all" | "movies" | "series" | "music";

export default function EntertainmentPage() {
  const { country, setCountry } = useCountry();
  const [tab, setTab] = useState<Tab>("all");
  const [genre, setGenre] = useState("Todo");

  const filteredMovies = useMemo(() => {
    let items = movies;
    if (tab === "movies") items = items.filter((m) => m.type === "movie");
    if (tab === "series") items = items.filter((m) => m.type === "series");
    if (genre !== "Todo")
      items = items.filter((m) => m.genre.includes(genre));
    return items.sort((a, b) => b.trendScore - a.trendScore);
  }, [tab, genre]);

  const filteredSongs = useMemo(() => {
    return songs
      .filter((s) => s.country === country || s.country === "both")
      .sort((a, b) => a.position - b.position);
  }, [country]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "Todo" },
    { key: "movies", label: "Películas" },
    { key: "series", label: "Series" },
    { key: "music", label: "Música" },
  ];

  return (
    <>
      <Header country={country} onCountryChange={setCountry} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Entretenimiento{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Trending
            </span>
          </h1>
          <p className="text-zinc-400">
            Lo más popular en cine, series y música -{" "}
            {country === "mx" ? "México" : "Estados Unidos"}
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-purple-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {(tab === "all" || tab === "movies" || tab === "series") && (
          <>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {entertainmentGenres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      genre === g
                        ? "bg-pink-500 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    }`}
                  >
                    {g}
                  </button>
                ))}
            </div>

            {filteredMovies.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                No hay resultados para este filtro
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
              Top Música -{" "}
              {country === "mx" ? "México" : "USA"}
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
