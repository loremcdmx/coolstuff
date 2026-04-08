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
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_280px] gap-6">
          {/* Left sidebar - categories */}
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-1">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400 mb-2 px-2">
                Categories
              </p>
              {categoryKeys.map((cat) => (
                <button
                  key={cat.filter}
                  onClick={() => handleCategory(cat.filter)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                    selectedCategory === cat.filter
                      ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, cat.key)}
                </button>
              ))}

              <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-4">
                <Link
                  href="/quiz"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 text-[10px] font-bold">?</span>
                  Personalize
                </Link>
                <Link
                  href="/for-you"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 text-[10px] font-bold">*</span>
                  For You
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div>
            <div className="mb-4">
              <h1 className="text-xl font-bold">
                {t(lang, "trendingIn")}{" "}
                {country === "mx" ? t(lang, "mexico") : t(lang, "usa")}
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t(lang, "popularOnAmazon")}
              </p>
            </div>

            {/* Mobile categories */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2 lg:hidden">
              {categoryKeys.map((cat) => (
                <button
                  key={cat.filter}
                  onClick={() => handleCategory(cat.filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.filter
                      ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {t(lang, cat.key)}
                </button>
              ))}
            </div>

            <div className="mb-5">
              <AISearch />
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-zinc-500">
                {t(lang, "noProducts")}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-16 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-amber-500 rounded-full" />
                  Editor's Picks
                </h3>
                <div className="space-y-2.5">
                  {shopEditorial.slice(0, 4).map((pick) => (
                    <a key={pick.id} href={pick.url} className="block group">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold text-zinc-500">
                          {pick.source}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          · {pick.date}
                        </span>
                      </div>
                      <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {pick.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                        {pick.summary}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-purple-500 rounded-full" />
                  Trending Now
                </h3>
                <div className="space-y-1.5">
                  {products
                    .filter((p) => p.country === country || p.country === "both")
                    .sort((a, b) => b.trendScore - a.trendScore)
                    .slice(0, 5)
                    .map((p, i) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-2 text-[13px]"
                      >
                        <span className="text-zinc-400 font-bold text-sm w-4 text-right">
                          {i + 1}
                        </span>
                        <span className="text-zinc-800 dark:text-zinc-200 truncate">
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
