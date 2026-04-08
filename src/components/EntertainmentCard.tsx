import { Movie, Song } from "@/data/entertainment";

export function MovieCard({ item }: { item: Movie }) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all">
      <div className="relative aspect-[2/3] bg-zinc-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.poster}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          ★ {item.rating}
        </div>
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              item.type === "series"
                ? "bg-purple-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {item.type === "series" ? "Serie" : "Película"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-tight mb-2">
          {item.title}
        </h3>
        <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.genre.map((g) => (
            <span
              key={g}
              className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>
        <div className="border-t border-zinc-800 pt-3">
          <p className="text-xs text-zinc-500 mb-1">Dónde ver:</p>
          <div className="flex flex-wrap gap-1">
            {item.whereToWatch.map((w) => (
              <span
                key={w}
                className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full"
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
      className="flex items-center gap-4 p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all group"
    >
      <span className="text-2xl font-bold text-zinc-600 w-8 text-right">
        {index + 1}
      </span>
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white text-sm truncate">
          {song.title}
        </h4>
        <p className="text-xs text-zinc-400 truncate">{song.artist}</p>
      </div>
      <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full shrink-0">
        {song.genre}
      </span>
    </a>
  );
}
