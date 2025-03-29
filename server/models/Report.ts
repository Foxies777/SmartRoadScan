import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  confidence: {type: Number, required: true},
  status: { type: String, enum: ["PENDING", "IN_PROGRESS", "COMPLETED"], default: "PENDING" },
}, { timestamps: true });

export const Report = mongoose.model("reports", ReportSchema);
