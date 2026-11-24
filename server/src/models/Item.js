import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["lost", "found"], required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["phone", "wallet", "keys", "id-card", "laptop", "bag", "books", "other"],
      required: true,
    },
    color: { type: String, default: "" },
    brand: { type: String, default: "" },
    location: {
      name: { type: String, required: true },
      lat: Number,
      lng: Number,
    },
    dateEvent: { type: Date, required: true },
    images: [String],
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    community: { type: String, default: "General" },
    status: {
      type: String,
      enum: ["open", "matched", "claimed", "returned"],
      default: "open",
    },
    verificationQuestion: { type: String, default: "" },
    verificationAnswer: { type: String, default: "", select: false },
  },
  { timestamps: true }
);

itemSchema.index({ title: "text", description: "text" });

export default mongoose.model("Item", itemSchema);