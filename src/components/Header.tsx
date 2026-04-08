"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useApp } from "@/app/providers";
import { t } from "@/data/i18n";

import type { TranslationKey } from "@/data/i18n";

type NavItem = { href: string; labelKey: TranslationKey } | { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/", labelKey: "shopping" },
  { href: "/entertainment", labelKey: "entertainment" },
  { href: "/for-you", label: "For You" },
];

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
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b bg-white/90 dark:bg-zinc-950/90 border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
            coolstuff
          </Link>
          <nav className="flex items-center">
            {navItems.map((item) => {
              const label = "labelKey" in item ? t(lang, (item as { labelKey: TranslationKey }).labelKey) : (item as { label: string }).label;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 text-[12px]">
            <button
              onClick={() => setCountry("mx")}
              className={`px-2 py-1 rounded-l-md font-medium transition-all ${
                country === "mx"
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
              }`}
            >
              MX
            </button>
            <button
              onClick={() => setCountry("us")}
              className={`px-2 py-1 rounded-r-md font-medium transition-all ${
                country === "us"
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
              }`}
            >
              US
            </button>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="7.5" cy="7.5" r="2.2" />
                <path d="M7.5 1.5v1.5M7.5 12v1.5M1.5 7.5H3M12 7.5h1.5M3.4 3.4l1.1 1.1M10.5 10.5l1.1 1.1M3.4 11.6l1.1-1.1M10.5 4.5l1.1-1.1" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg p-2 space-y-2">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1 px-1">
                    {t(lang, "language")}
                  </p>
                  <div className="flex gap-0.5">
                    {(["en", "es"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium ${
                          lang === l
                            ? "bg-zinc-900 dark:bg-zinc-200 text-white dark:text-zinc-900"
                            : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {l === "en" ? "EN" : "ES"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1 px-1">
                    {t(lang, "theme")}
                  </p>
                  <div className="flex gap-0.5">
                    {(["dark", "light"] as const).map((th) => (
                      <button
                        key={th}
                        onClick={() => setTheme(th)}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium ${
                          theme === th
                            ? "bg-zinc-900 dark:bg-zinc-200 text-white dark:text-zinc-900"
                            : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {th === "dark" ? t(lang, "dark") : t(lang, "light")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
