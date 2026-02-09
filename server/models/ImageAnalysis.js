import mongoose from "mongoose";

const imageAnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  filePath: { type: String },
  prompt: { type: String },
  analysis: { type: String }
}, { timestamps: true });

export default mongoose.model("ImageAnalysis", imageAnalysisSchema);
