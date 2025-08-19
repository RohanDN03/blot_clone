import { GenAiCode } from "@/Config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    // Send prompt to Gemini
    const result = await GenAiCode.sendMessage(prompt);

    // Extract response text safely
    const resp =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let parsed;
    try {
      parsed = JSON.parse(resp); // Expecting JSON from Gemini
    } catch {
      parsed = { raw: resp }; // fallback if plain text
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("AI Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// app/api/gen-ai-code/route.js
