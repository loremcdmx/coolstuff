import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { query, country } = await req.json();

    const countryName = country === "mx" ? "México" : "Estados Unidos";

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Eres un experto en tendencias de compras y productos. El usuario está en ${countryName} y busca: "${query}"

Recomienda 3-5 productos específicos que se pueden comprar en Amazon ${country === "mx" ? "México" : "USA"}. Para cada uno incluye:
- Nombre del producto
- Precio aproximado en ${country === "mx" ? "MXN" : "USD"}
- Por qué es buena opción
- Rating aproximado

Sé conciso y directo. Responde en español.`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    return NextResponse.json({ result: textBlock?.text || "Sin resultados" });
  } catch (error) {
    console.error("AI Search error:", error);
    return NextResponse.json(
      { error: "Error al procesar la búsqueda. Verifica que ANTHROPIC_API_KEY esté configurada." },
      { status: 500 }
    );
  }
}
