import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

const systemPrompt = "You are an AI vision assistant. Analyze images and provide detailed descriptions.";

export async function analyzeImage(req, res) {
  try {
    const file = req.file;
    const { prompt } = req.body;

    if (!file) {
      return res.status(400).json({ message: "Image file is required", success: false });
    }

    const userPrompt = prompt || "Describe this image in detail";
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
    });
    const analysis = completion.choices[0].message.content;
    
    res.json({ analysis });
  } catch (err) {
    console.error("Image analysis error:", err);
    const status = err?.status || 500;
    const message = status === 429
      ? "⚠️ Rate limit exceeded. Please wait a moment and try again."
      : err.message || "Failed to analyze image";
    res.status(status).json({ message, success: false });
  }
}
