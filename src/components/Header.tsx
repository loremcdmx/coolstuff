"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useApp } from "@/app/providers";
import { t, TranslationKey } from "@/data/i18n";

type NavItem =
  | { href: string; labelKey: TranslationKey }
  | { href: string; label: string };

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
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--color-surface)",
        borderBottom: "2px solid var(--color-accent)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg tracking-[-0.04em] font-bold uppercase"
            style={{ color: "var(--color-text)", letterSpacing: "-0.04em" }}
          >
            COOLSTUFF
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const label =
                "labelKey" in item
                  ? t(lang, item.labelKey)
                  : (item as { label: string }).label;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1.5 text-sm transition-colors"
                  style={{
                    color: isActive
                      ? "var(--color-text)"
                      : "var(--color-text-secondary)",
                    fontWeight: isActive ? 600 : 400,
                    borderBottom: isActive
                      ? "2px solid var(--color-text)"
                      : "2px solid transparent",
                    marginBottom: "-2px",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Country toggle — text buttons with underline */}
          <div className="flex items-center gap-0.5 text-sm">
            {(["mx", "us"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className="px-2 py-1 uppercase transition-all"
                style={{
                  color:
                    country === c
                      ? "var(--color-text)"
                      : "var(--color-text-tertiary)",
                  fontWeight: country === c ? 600 : 400,
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  borderBottom:
                    country === c
                      ? "2px solid var(--color-accent)"
                      : "2px solid transparent",
                }}
              >
                {c === "mx" ? "MX" : "US"}
              </button>
            ))}
          </div>

          {/* Settings */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="w-7 h-7 flex items-center justify-center transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Settings"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle cx="3" cy="8" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="13" cy="8" r="1.5" />
              </svg>
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 w-44 p-3 space-y-3"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.12em] mb-1.5"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {t(lang, "language")}
                  </p>
                  <div className="flex gap-1">
                    {(["en", "es"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className="flex-1 py-1 text-xs font-medium uppercase transition-all"
                        style={{
                          background:
                            lang === l
                              ? "var(--color-text)"
                              : "transparent",
                          color:
                            lang === l
                              ? "var(--color-bg)"
                              : "var(--color-text-secondary)",
                          borderRadius: "var(--radius-sm)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.12em] mb-1.5"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {t(lang, "theme")}
                  </p>
                  <div className="flex gap-1">
                    {(["dark", "light"] as const).map((th) => (
                      <button
                        key={th}
                        onClick={() => setTheme(th)}
                        className="flex-1 py-1 text-xs font-medium transition-all"
                        style={{
                          background:
                            theme === th
                              ? "var(--color-text)"
                              : "transparent",
                          color:
                            theme === th
                              ? "var(--color-bg)"
                              : "var(--color-text-secondary)",
                          borderRadius: "var(--radius-sm)",
                          fontFamily: "var(--font-mono)",
                        }}
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
