import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

const systemPrompt = `You are an Express.js API generator. Generate complete CRUD API code including:
- Model schema
- Controller functions
- Routes
- Validation
Use modern ES6+ syntax.`;

export async function generateAPI(req, res) {
  const { modelName, fields } = req.body;

  if (!modelName || !fields) {
    return res.status(400).json({ message: "Model name and fields are required", success: false });
  }

  try {
    const prompt = `Generate a complete Express CRUD API for model: ${modelName}\nFields: ${fields}`;
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
    });
    const code = completion.choices[0].message.content;
    res.json({ code });
  } catch (err) {
    console.error("Generator error:", err);
    const status = err?.status || 500;
    const message = status === 429
      ? "⚠️ Rate limit exceeded. Please wait a moment and try again."
      : err.message || "Failed to generate API";
    res.status(status).json({ message, success: false });
  }
}
