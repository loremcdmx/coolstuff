import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all hover:shadow-xl hover:shadow-amber-500/5"
    >
      <div className="relative aspect-square bg-zinc-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          #{product.trendScore}
        </div>
        {product.country !== "both" && (
          <div className="absolute top-3 left-3 bg-zinc-900/80 text-xs px-2 py-1 rounded-full">
            {product.country === "mx" ? "MX" : "US"}
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-amber-400 font-medium mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-white text-sm leading-tight mb-2 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            {product.currency === "MXN" ? "$" : "US$"}
            {product.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <span className="text-amber-400">★</span>
            {product.rating} ({(product.reviews / 1000).toFixed(0)}k)
          </div>
        </div>
      </div>
    </a>
  );
}
