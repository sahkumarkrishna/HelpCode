import mongoose from "mongoose";

const debugSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  error: { type: String, required: true },
  solution: { type: String },
  fixed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Debug", debugSchema);
