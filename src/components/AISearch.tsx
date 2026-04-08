"use client";

import { useState } from "react";

export default function AISearch({ country }: { country: "mx" | "us" }) {
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
        body: JSON.stringify({ query, country }),
      });
      const data = await res.json();
      setResult(data.result || data.error || "Sin resultados");
    } catch {
      setResult("Error al buscar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-amber-400 mb-3">
        Busca con IA
      </h3>
      <p className="text-zinc-400 text-sm mb-4">
        Describe lo que buscas y te recomendaremos lo mejor
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Ej: audífonos buenos para el gym por menos de $1000..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-semibold rounded-xl transition-colors"
        >
          {loading ? "..." : "Buscar"}
        </button>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-zinc-900/80 rounded-xl text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
          {result}
        </div>
      )}
    </div>
  );
}
