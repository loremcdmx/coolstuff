import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_PATH = join(__dirname, "..", "src", "data", "products.json");
const EDITORIAL_PATH = join(__dirname, "..", "src", "data", "editorial.json");

const CATEGORIES = [
  "Tech",
  "Home",
  "Fashion",
  "Beauty",
  "Sports",
  "Gaming",
  "Books",
  "Kitchen",
  "Pets",
];

async function updateProducts() {
  const client = new Anthropic();
  const existing = JSON.parse(readFileSync(PRODUCTS_PATH, "utf-8"));
  const existingTitles = existing.map((p) => p.title);
  const maxId = Math.max(...existing.map((p) => parseInt(p.id)));

  console.log(
    `Current catalog: ${existing.length} products (max id: ${maxId})`
  );

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are a product trend analyst. Generate 5 NEW trending products that are currently popular on Amazon in Mexico and the US.

EXISTING PRODUCTS (do NOT repeat these):
${existingTitles.map((t) => `- ${t}`).join("\n")}

CATEGORIES to choose from: ${CATEGORIES.join(", ")}

For each product, provide a JSON object with these EXACT fields:
- id: string (start from "${maxId + 1}")
- title: string (product name, can be in Spanish for MX-only products)
- category: one of the categories listed above
- price: number (realistic price — MXN for mx/both, USD for us-only)
- currency: "MXN" or "USD"
- rating: number between 4.0 and 5.0
- reviews: number (realistic review count)
- image: string (use a plausible Amazon image URL like "https://m.media-amazon.com/images/I/PLACEHOLDER._AC_SL1500_.jpg")
- trending: true
- trendScore: number between 70 and 99
- amazonUrl: "https://amazon.com.mx" for mx/both, "https://amazon.com" for us
- country: "mx", "us", or "both"

RULES:
- Pick products that are genuinely popular right now (bestsellers, viral items, new releases)
- Cover at least 3 different categories
- Mix of price ranges
- At least 1 mx-only, 1 us-only, and rest "both"
- Use realistic Amazon prices

Return ONLY a valid JSON array, no markdown, no explanation.`,
      },
    ],
  });

  const text = response.content[0].text.trim();

  let newProducts;
  try {
    newProducts = JSON.parse(text);
  } catch {
    // Try extracting JSON from possible markdown wrapper
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error("Failed to parse AI response:", text.slice(0, 200));
      process.exit(1);
    }
    newProducts = JSON.parse(match[0]);
  }

  // Validate and filter duplicates
  const filtered = newProducts.filter(
    (p) =>
      p.id &&
      p.title &&
      p.category &&
      CATEGORIES.includes(p.category) &&
      !existingTitles.some(
        (t) => t.toLowerCase() === p.title.toLowerCase()
      )
  );

  if (filtered.length === 0) {
    console.log("No new unique products generated. Skipping update.");
    return false;
  }

  // Cap catalog at 60 products — remove oldest low-score items if needed
  const MAX_PRODUCTS = 60;
  let merged = [...existing, ...filtered];
  if (merged.length > MAX_PRODUCTS) {
    merged.sort((a, b) => b.trendScore - a.trendScore);
    merged = merged.slice(0, MAX_PRODUCTS);
    // Re-assign sequential IDs
    merged.forEach((p, i) => (p.id = String(i + 1)));
  }

  writeFileSync(PRODUCTS_PATH, JSON.stringify(merged, null, 2) + "\n");
  console.log(
    `Updated: ${existing.length} → ${merged.length} products (+${filtered.length} new)`
  );
  return true;
}

async function updateEditorial() {
  // Only update editorial if the file exists as JSON
  let editorialPath;
  try {
    readFileSync(EDITORIAL_PATH, "utf-8");
    editorialPath = EDITORIAL_PATH;
  } catch {
    // Editorial is still in .ts format — skip auto-update
    console.log("Editorial JSON not found, skipping editorial update.");
    return;
  }

  const client = new Anthropic();
  const existing = JSON.parse(readFileSync(editorialPath, "utf-8"));
  const products = JSON.parse(readFileSync(PRODUCTS_PATH, "utf-8"));
  const existingTitles = existing.map((e) => e.title);

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Generate 2 NEW editorial pick articles related to trending products. These are short review/roundup article references from publications like Wirecutter, Wired, The Verge, GQ, NYT, Bon Appétit, Allure, etc.

EXISTING ARTICLES (do NOT repeat):
${existingTitles.map((t) => `- ${t}`).join("\n")}

CURRENT PRODUCT CATEGORIES in catalog: ${[...new Set(products.map((p) => p.category))].join(", ")}

Return a JSON array where each object has:
- id: string (e.g., "e${existing.length + 1}")
- title: string
- source: string (publication name)
- sourceIcon: string (2-3 letter abbreviation)
- category: string
- summary: string (1-2 sentences)
- url: "#"
- image: "https://picsum.photos/seed/UNIQUE_SLUG/600/300"
- date: current month and year (e.g., "Apr 2026")

Return ONLY a valid JSON array.`,
      },
    ],
  });

  const text = response.content[0].text.trim();
  let newPicks;
  try {
    newPicks = JSON.parse(text);
  } catch {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return;
    newPicks = JSON.parse(match[0]);
  }

  const merged = [...existing, ...newPicks].slice(0, 20);
  writeFileSync(editorialPath, JSON.stringify(merged, null, 2) + "\n");
  console.log(`Editorial: ${existing.length} → ${merged.length} picks`);
}

async function main() {
  console.log("--- Product Catalog Update ---");
  console.log(new Date().toISOString());

  const changed = await updateProducts();
  if (changed) {
    await updateEditorial();
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Update failed:", err.message);
  process.exit(1);
});
