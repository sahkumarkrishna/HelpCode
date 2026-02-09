import OpenAI from "openai";
import Conversation from "../models/Conversation.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations", success: false });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ _id: req.params.chatId, userId: req.user._id });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found", success: false });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation", success: false });
  }
};

export const createConversation = async (req, res) => {
  try {
    const { title } = req.body;
    const conversation = await Conversation.create({
      userId: req.user._id,
      title: title || "New Chat",
      messages: []
    });
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error creating conversation", success: false });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    await Conversation.findOneAndDelete({ _id: req.params.chatId, userId: req.user._id });
    res.json({ message: "Conversation deleted", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting conversation", success: false });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, message, mode } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required", success: false });
    }

    const systemInstructions = {
      assistant: "You are a helpful AI assistant.",
      tutor: "You are an educational tutor. Explain concepts clearly and patiently.",
      interviewer: "You are a technical interviewer. Ask relevant questions and evaluate responses.",
      coder: "You are a coding assistant. Help with code, debugging, and best practices."
    };

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: systemInstructions[mode] || systemInstructions.assistant },
        { role: "user", content: message }
      ],
    });

    const response = completion.choices[0].message.content;

    if (chatId) {
      await Conversation.findByIdAndUpdate(chatId, {
        $push: {
          messages: {
            $each: [
              { role: "user", content: message },
              { role: "assistant", content: response }
            ]
          }
        },
        updatedAt: Date.now()
      });
    }

    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    const status = error?.status || 500;
    const message = status === 429
      ? "⚠️ Rate limit exceeded. Please wait a moment and try again."
      : error.message || "Error sending message";
    res.status(status).json({ message, success: false });
  }
};
