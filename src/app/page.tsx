"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import AISearch from "@/components/AISearch";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { categoryKeys, t } from "@/data/i18n";
import { useApp } from "./providers";

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

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t(lang, "trendingIn")}{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {country === "mx" ? t(lang, "mexico") : t(lang, "usa")}
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            {t(lang, "popularOnAmazon")}
          </p>
        </div>

        <div className="mb-8">
          <AISearch />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categoryKeys.map((cat) => (
            <button
              key={cat.filter}
              onClick={() => setSelectedCategory(cat.filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.filter
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {t(lang, cat.key)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            {t(lang, "noProducts")}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
