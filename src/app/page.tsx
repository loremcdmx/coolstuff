"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import AISearch from "@/components/AISearch";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { editorialPicks } from "@/data/editorial";
import { categoryKeys, t } from "@/data/i18n";
import { useApp } from "./providers";
import { trackCategoryClick } from "@/lib/profile";
import Link from "next/link";

export default function Home() {
  const { country, lang } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    let items = products.filter(
      (p) => p.country === country || p.country === "both"
    );
    if (selectedCategory !== "All") {
      items = items.filter((p) => p.category === selectedCategory);
    }
    return items.sort((a, b) => b.trendScore - a.trendScore);
  }, [country, selectedCategory]);

  const shopEditorial = editorialPicks.filter(
    (e) => !["Entertainment", "Music"].includes(e.category)
  );

  const handleCategory = (filter: string) => {
    setSelectedCategory(filter);
    if (filter !== "All") trackCategoryClick(filter);
  };

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_260px] gap-8">
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
                Categories
              </p>
              <div className="space-y-0.5">
                {categoryKeys.map((cat) => (
                  <button
                    key={cat.filter}
                    onClick={() => handleCategory(cat.filter)}
                    className="w-full text-left px-3 py-1.5 text-[13px] transition-all"
                    style={{
                      color:
                        selectedCategory === cat.filter
                          ? "var(--color-text)"
                          : "var(--color-text-secondary)",
                      fontWeight: selectedCategory === cat.filter ? 600 : 400,
                      borderLeft:
                        selectedCategory === cat.filter
                          ? "2px solid var(--color-accent)"
                          : "2px solid transparent",
                      background:
                        selectedCategory === cat.filter
                          ? "var(--color-surface-hover)"
                          : "transparent",
                    }}
                  >
                    {t(lang, cat.key)}
                  </button>
                ))}
              </div>

              <div
                className="mt-6 pt-6"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <Link
                  href="/quiz"
                  className="block px-3 py-1.5 text-[13px] transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "var(--color-text-secondary)")
                  }
                >
                  Personalize
                </Link>
                <Link
                  href="/for-you"
                  className="block px-3 py-1.5 text-[13px] transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "var(--color-text-secondary)")
                  }
                >
                  For You
                </Link>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div>
            <div className="mb-6">
              <h1
                className="text-3xl font-bold tracking-tight mb-1"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                {t(lang, "trendingIn")}{" "}
                {country === "mx" ? t(lang, "mexico") : t(lang, "usa")}
              </h1>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {t(lang, "popularOnAmazon")}
              </p>
            </div>

            {/* Mobile categories */}
            <div className="flex gap-1 mb-4 overflow-x-auto pb-2 lg:hidden">
              {categoryKeys.map((cat) => (
                <button
                  key={cat.filter}
                  onClick={() => handleCategory(cat.filter)}
                  className="px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-all"
                  style={{
                    background:
                      selectedCategory === cat.filter
                        ? "var(--color-text)"
                        : "transparent",
                    color:
                      selectedCategory === cat.filter
                        ? "var(--color-bg)"
                        : "var(--color-text-secondary)",
                    border: `1px solid ${selectedCategory === cat.filter ? "var(--color-text)" : "var(--color-border)"}`,
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {t(lang, cat.key)}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <AISearch />
            </div>

            {filtered.length === 0 ? (
              <div
                className="text-center py-16 text-sm"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {t(lang, "noProducts")}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Editorial */}
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.15em] mb-3"
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  01 — Editor&apos;s Picks
                </p>
                <div className="space-y-4">
                  {shopEditorial.slice(0, 4).map((pick) => (
                    <a
                      key={pick.id}
                      href={pick.url}
                      className="block group"
                    >
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

              {/* Trending list */}
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.15em] mb-3"
                  style={{
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  02 — Trending Now
                </p>
                <div>
                  {products
                    .filter(
                      (p) => p.country === country || p.country === "both"
                    )
                    .sort((a, b) => b.trendScore - a.trendScore)
                    .slice(0, 5)
                    .map((p, i) => (
                      <div
                        key={p.id}
                        className="flex items-baseline gap-2 py-1.5"
                        style={{
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        <span
                          className="text-sm font-medium w-5 text-right shrink-0"
                          style={{
                            color: "var(--color-text-tertiary)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-[13px] truncate"
                          style={{ color: "var(--color-text)" }}
                        >
                          {p.title}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
