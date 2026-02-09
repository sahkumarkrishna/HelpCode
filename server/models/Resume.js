import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  filePath: { type: String },
  feedback: { type: String },
  score: { type: Number }
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
