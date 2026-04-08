"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Country = "mx" | "us";

export default function Header({
  country,
  onCountryChange,
}: {
  country: Country;
  onCountryChange: (c: Country) => void;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            CoolStuff
          </Link>
          <nav className="flex gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Compras
            </Link>
            <Link
              href="/entertainment"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/entertainment"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Entretenimiento
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-1">
          <button
            onClick={() => onCountryChange("mx")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              country === "mx"
                ? "bg-green-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            MX
          </button>
          <button
            onClick={() => onCountryChange("us")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              country === "us"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            US
          </button>
        </div>
      </div>
    </header>
  );
}
