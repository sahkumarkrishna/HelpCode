import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  attachments: [{ type: String, url: String }]
});

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "New Chat" },
  messages: [messageSchema],
  mode: { type: String, enum: ["tutor", "interviewer", "coding", "doctor", "general"], default: "general" },
  tags: [String],
  isPinned: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: false },
  language: { type: String, default: "en" }
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);
