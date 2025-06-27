/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/ai/generate-template/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { error: "Prompt is required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error(
                "🔐 Missing GEMINI_API_KEY in environment variables."
            );
            return NextResponse.json(
                { error: "Server misconfiguration: no API key" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const fullPrompt = `
You are a generator of Editor.js blocks.

Generate an Editor.js JSON document about the topic: "${prompt}"

Only return valid JSON with structure:
{
  "time": <number>,
  "blocks": [ { ... } ],
  "version": "2.28.0"
}

Do not explain. Do not wrap with markdown. Do not use \`\`\`. Just pure JSON.
        `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const rawText = response.text().trim();

        const json = JSON.parse(rawText); // مباشر بلا match

        return NextResponse.json({ data: json });
    } catch (error: any) {
        console.error("❌ AI Generation Error:", error.message);
        return NextResponse.json(
            { error: "An error occurred during AI generation." },
            { status: 500 }
        );
    }
}
