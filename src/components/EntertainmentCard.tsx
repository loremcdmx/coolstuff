"use client";

import { Movie, Song } from "@/data/entertainment";
import { useApp } from "@/app/providers";
import { t } from "@/data/i18n";

export function MovieCard({
  item,
  index = 0,
}: {
  item: Movie;
  index?: number;
}) {
  const { lang } = useApp();

  return (
    <div
      className="group animate-fade-up"
      style={{
        animationDelay: `${index * 40}ms`,
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        transition: "border-color var(--transition-fast)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-border-strong)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-border)")
      }
    >
      <div
        className="relative aspect-[2/3] overflow-hidden"
        style={{ background: "var(--color-surface-hover)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.poster}
          alt={item.title}
          className="w-full h-full object-cover transition-opacity duration-[350ms] group-hover:opacity-90"
        />
        <span
          className="absolute top-2 right-2 text-[10px] font-medium px-1.5 py-0.5"
          style={{
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {item.rating}
        </span>
        <span
          className="absolute top-2 left-2 text-[10px] font-medium uppercase px-1.5 py-0.5"
          style={{
            background:
              item.type === "series"
                ? "var(--color-accent)"
                : "var(--color-text)",
            color: item.type === "series" ? "#fff" : "var(--color-bg)",
            fontFamily: "var(--font-mono)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {item.type === "series" ? t(lang, "series") : t(lang, "movie")}
        </span>
      </div>
      <div className="p-3">
        <h3
          className="text-sm font-medium leading-snug mb-1.5"
          style={{ color: "var(--color-text)" }}
        >
          {item.title}
        </h3>
        <p
          className="text-xs leading-relaxed mb-2 line-clamp-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {item.genre.map((g) => (
            <span
              key={g}
              className="text-[10px] px-1.5 py-0.5"
              style={{
                background: "var(--color-surface-hover)",
                color: "var(--color-text-secondary)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {g}
            </span>
          ))}
        </div>
        <div
          className="pt-2"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.1em] mb-1"
            style={{
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {t(lang, "whereToWatch")}
          </p>
          <div className="flex flex-wrap gap-1">
            {item.whereToWatch.map((w) => (
              <span
                key={w}
                className="text-[10px] font-medium px-1.5 py-0.5"
                style={{
                  background: "var(--color-accent-subtle)",
                  color: "var(--color-accent)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SongCard({ song, index }: { song: Song; index: number }) {
  return (
    <a
      href={song.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 py-2.5 px-2 group animate-fade-up transition-colors"
      style={{
        animationDelay: `${index * 40}ms`,
        borderBottom: "1px solid var(--color-border)",
        borderRadius: 0,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--color-surface-hover)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        className="text-sm font-medium w-6 text-right"
        style={{ color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className="w-10 h-10 overflow-hidden shrink-0"
        style={{ borderRadius: "var(--radius-sm)", background: "var(--color-surface-hover)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>
          {song.title}
        </h4>
        <p className="text-xs truncate" style={{ color: "var(--color-text-secondary)" }}>
          {song.artist}
        </p>
      </div>
      <span
        className="text-[10px] uppercase tracking-[0.08em] shrink-0"
        style={{ color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}
      >
        {song.genre}
      </span>
    </a>
  );
}
