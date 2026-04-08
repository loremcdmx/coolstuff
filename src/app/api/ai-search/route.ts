import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { query, country, lang = "en" } = await req.json();

    const countryName = country === "mx" ? "Mexico" : "United States";
    const responseLang = lang === "es" ? "Spanish" : "English";

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a shopping trends expert. The user is in ${countryName} and is looking for: "${query}"

Recommend 3-5 specific products available on Amazon ${country === "mx" ? "Mexico" : "USA"}. For each include:
- Product name
- Approximate price in ${country === "mx" ? "MXN" : "USD"}
- Why it's a good choice
- Approximate rating

Be concise and direct. Respond in ${responseLang}.`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    return NextResponse.json({ result: textBlock?.text || "No results" });
  } catch (error) {
    console.error("AI Search error:", error);
    return NextResponse.json(
      { error: "Search error. Make sure ANTHROPIC_API_KEY is configured." },
      { status: 500 }
    );
  }
}
