"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useApp } from "@/app/providers";
import { t } from "@/data/i18n";

export default function Header() {
  const { country, setCountry, lang, setLang, theme, setTheme } = useApp();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 dark:bg-zinc-950/80 bg-white/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
          >
            CoolStuff
          </Link>
          <nav className="flex gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              {t(lang, "shopping")}
            </Link>
            <Link
              href="/entertainment"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/entertainment"
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              {t(lang, "entertainment")}
            </Link>
          </nav>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Settings"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10" cy="10" r="3" />
              <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.93 3.93l1.41 1.41M14.66 14.66l1.41 1.41M3.93 16.07l1.41-1.41M14.66 5.34l1.41-1.41" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-3 space-y-3">
              {/* Language */}
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium uppercase tracking-wide">
                  {t(lang, "language")}
                </p>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                  <button
                    onClick={() => setLang("en")}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      lang === "en"
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang("es")}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      lang === "es"
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    Español
                  </button>
                </div>
              </div>

              {/* Theme */}
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium uppercase tracking-wide">
                  {t(lang, "theme")}
                </p>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      theme === "dark"
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {t(lang, "dark")}
                  </button>
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      theme === "light"
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {t(lang, "light")}
                  </button>
                </div>
              </div>

              {/* Country */}
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium uppercase tracking-wide">
                  {t(lang, "country")}
                </p>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                  <button
                    onClick={() => setCountry("mx")}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      country === "mx"
                        ? "bg-green-600 text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    MX
                  </button>
                  <button
                    onClick={() => setCountry("us")}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      country === "us"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    US
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
