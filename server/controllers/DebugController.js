import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

const systemPrompt = `You are an expert debugging assistant. Analyze code and error messages, then provide:
1. Root cause of the error
2. Step-by-step fix
3. Corrected code
4. Prevention tips`;

export async function fixBug(req, res) {
  const { code, error } = req.body;

  if (!code || !error) {
    return res.status(400).json({ message: "Code and error are required", success: false });
  }

  try {
    const prompt = `Code:\n${code}\n\nError:\n${error}\n\nPlease debug and fix this issue.`;
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
    });
    const response = completion.choices[0].message.content;
    res.json({ solution: response });
  } catch (err) {
    console.error("Debug error:", err);
    const status = err?.status || 500;
    const message = status === 429
      ? "⚠️ Rate limit exceeded. Please wait a moment and try again."
      : err.message || "Failed to debug";
    res.status(status).json({ message, success: false });
  }
}
