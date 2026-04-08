"use client";

import { useState } from "react";
import { useApp } from "@/app/providers";
import { t } from "@/data/i18n";

export default function AISearch() {
  const { country, lang } = useApp();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, country, lang }),
      });
      const data = await res.json();
      setResult(data.result || data.error || t(lang, "aiNoResults"));
    } catch {
      setResult(t(lang, "aiSearchError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-amber-500 dark:text-amber-400 mb-3">
        {t(lang, "aiSearchTitle")}
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
        {t(lang, "aiSearchDesc")}
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={t(lang, "aiSearchPlaceholder")}
          className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-semibold rounded-xl transition-colors"
        >
          {loading ? "..." : t(lang, "aiSearchButton")}
        </button>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl text-zinc-700 dark:text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
          {result}
        </div>
      )}
    </div>
  );
}
