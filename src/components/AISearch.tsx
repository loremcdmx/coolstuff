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
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={t(lang, "aiSearchPlaceholder")}
          className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-40 text-white dark:text-zinc-900 text-sm font-medium rounded-lg transition-colors"
        >
          {loading ? "..." : t(lang, "aiSearchButton")}
        </button>
      </div>
      {result && (
        <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {result}
        </div>
      )}
    </div>
  );
}
