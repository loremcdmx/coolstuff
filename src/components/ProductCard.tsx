import { Product } from "@/data/products";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <a
      href={product.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block animate-fade-up"
      style={{
        animationDelay: `${index * 40}ms`,
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        transition: "border-color var(--transition-fast)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-border-strong)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-border)")
      }
    >
      <div className="relative aspect-square overflow-hidden" style={{ background: "var(--color-surface-hover)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-[350ms] group-hover:opacity-90"
        />
        <span
          className="absolute top-2 right-2 text-[10px] font-medium px-1.5 py-0.5"
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          #{product.trendScore}
        </span>
        {product.country !== "both" && (
          <span
            className="absolute top-2 left-2 text-[10px] font-medium px-1.5 py-0.5"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontFamily: "var(--font-mono)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {product.country.toUpperCase()}
          </span>
        )}
      </div>
      <div className="p-3">
        <p
          className="text-[10px] uppercase tracking-[0.1em] mb-1"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
        >
          {product.category}
        </p>
        <h3
          className="text-sm font-medium leading-snug mb-2 line-clamp-2"
          style={{ color: "var(--color-text)" }}
        >
          {product.title}
        </h3>
        {product.badges && product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="text-[9px] font-medium leading-tight px-1.5 py-0.5"
                style={{
                  background: "var(--color-surface-hover)",
                  color: "var(--color-text-secondary)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold" style={{ color: "var(--color-text)" }}>
            {product.currency === "MXN" ? "$" : "US$"}
            {product.price.toLocaleString()}
          </span>
          <span
            className="text-[11px]"
            style={{ color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}
          >
            {product.rating} ({(product.reviews / 1000).toFixed(0)}k)
          </span>
        </div>
      </div>
    </a>
  );
}
