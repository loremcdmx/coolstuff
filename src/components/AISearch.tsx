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
          className="flex-1 px-3 py-2 text-sm transition-colors"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)",
            color: "var(--color-text)",
            outline: "none",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-border-strong)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-border)")
          }
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-40"
          style={{
            background: "var(--color-text)",
            color: "var(--color-bg)",
            borderRadius: "var(--radius-card)",
          }}
        >
          {loading ? "..." : t(lang, "aiSearchButton")}
        </button>
      </div>
      {result && (
        <div
          className="mt-3 p-3 text-sm leading-relaxed whitespace-pre-wrap"
          style={{
            background: "var(--color-surface-hover)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-serif)",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}
