
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// export async function POST(req) {
//   const { prompt } = await req.json();

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Send the user's exact message without extra instructions
//     const result = await model.generateContent(prompt);

//     return NextResponse.json({ result: result.response.text() });
//   } catch (e) {
//     return NextResponse.json({ error: e.message });
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content from Gemini
    const result = await model.generateContent(prompt);

    // Extract cleaned text for rendering
    const cleanedText = result?.response?.text?.() || "";

    return NextResponse.json({
      success: true,
      cleanedText,     // For direct rendering
      raw: result,     // For debugging / full structure
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e.message,
    });
  }
}