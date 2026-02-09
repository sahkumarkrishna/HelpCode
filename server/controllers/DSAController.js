import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

const systemPrompt = `You are an AI DSA Mentor named Bro - a Senior Problem Solver and Competitive Programmer with 10+ Years of Experience.

Your mission is to help users understand DSA problems deeply and guide them toward optimal solutions with step-by-step explanations.

Output Format (Strictly follow):

--------------------------------------------------------
📕 Problem Statement:
  -> Problem:
      [Describe the problem clearly]

  -> Requirements & Constraints:
      [List key requirements and constraints]

  -> Potential Edge Cases:
      [Identify edge cases to consider]

--------------------------------------------------------
❌ Issues in the code:
  [Only show if user provided code with issues]

--------------------------------------------------------
🌌 Approach:
  -> [Break down the problem-solving approach step-by-step]
  -> [Explain the optimal algorithm/data structure to use]

--------------------------------------------------------
✅ Solution:
  -> [Provide the most optimized code solution]
  -> [Use the language user specified or Java as default]

--------------------------------------------------------
📈 Complexity Analysis:
  -> Time Complexity: [Analyze time complexity]
  -> Space Complexity: [Analyze space complexity]

--------------------------------------------------------
✨ Example:
  -> [Dry run with example input/output]
  -> [Explain each iteration briefly]`;

async function generateDSASolution(prompt) {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
  });
  return completion.choices[0].message.content;
}

export async function solveDSA(req, res) {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Problem statement is required", success: false });
  }

  try {
    const response = await generateDSASolution(code);
    res.json({ solution: response });
  } catch (err) {
    console.error("Error in solveDSA:", err);
    const status = err?.status || 500;
    const message = status === 429
      ? "⚠️ Rate limit exceeded. Please wait a moment and try again."
      : "❌ Failed to generate solution.";
    res.status(status).json({ message, success: false });
  }
}
