import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

const systemPrompt = `You are a professional resume reviewer. Analyze resumes and provide:
1. Overall assessment
2. Strengths
3. Areas for improvement
4. ATS optimization tips
5. Formatting suggestions`;

export async function analyzeResume(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Resume file is required", success: false });
    }

    const prompt = `Analyze this resume and provide detailed feedback including: 1. Overall assessment 2. Strengths 3. Areas for improvement 4. ATS optimization tips 5. Formatting suggestions`;
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
    });
    const feedback = completion.choices[0].message.content;
    
    res.json({ feedback });
  } catch (err) {
    console.error("Resume analysis error:", err);
    const status = err?.status || 500;
    const message = status === 429
      ? "⚠️ Rate limit exceeded. Please wait a moment and try again."
      : err.message || "Failed to analyze resume";
    res.status(status).json({ message, success: false });
  }
}
