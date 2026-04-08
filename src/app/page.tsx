"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import AISearch from "@/components/AISearch";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useCountry } from "./providers";

export default function Home() {
  const { country, setCountry } = useCountry();
  const [selectedCategory, setSelectedCategory] = useState("Todo");

  const filtered = useMemo(() => {
    let items = products.filter(
      (p) => p.country === country || p.country === "both"
    );
    if (selectedCategory !== "Todo") {
      items = items.filter((p) => p.category === selectedCategory);
    }
    return items.sort((a, b) => b.trendScore - a.trendScore);
  }, [country, selectedCategory]);

  return (
    <>
      <Header country={country} onCountryChange={setCountry} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Trending en{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {country === "mx" ? "México" : "Estados Unidos"}
            </span>
          </h1>
          <p className="text-zinc-400">
            Lo más popular en Amazon ahora mismo
          </p>
        </div>

        <div className="mb-8">
          <AISearch country={country} />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            No hay productos trending en esta categoría
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
