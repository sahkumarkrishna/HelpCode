import mongoose from "mongoose";

const apiGeneratorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  modelName: { type: String, required: true },
  fields: { type: String, required: true },
  generatedCode: { type: String }
}, { timestamps: true });

export default mongoose.model("APIGenerator", apiGeneratorSchema);
