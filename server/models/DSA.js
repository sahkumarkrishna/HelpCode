import mongoose from "mongoose";

const dsaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problem: { type: String, required: true },
  code: { type: String },
  language: { type: String, default: "java" },
  solution: { type: String },
  complexity: { type: String }
}, { timestamps: true });

export default mongoose.model("DSA", dsaSchema);
