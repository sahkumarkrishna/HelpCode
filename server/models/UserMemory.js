import mongoose from "mongoose";

const userMemorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  preferences: { type: Map, of: String },
  facts: [{ fact: String, timestamp: Date }],
  favoriteTopics: [String],
  customInstructions: String
}, { timestamps: true });

export default mongoose.model("UserMemory", userMemorySchema);
