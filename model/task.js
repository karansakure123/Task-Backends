// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, required: true, enum: ["pending", "in-progress", "completed"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    imageUrl: { type: String }, // URL to image
    imagePublicId: { type: String }, // For Cloudinary cleanup
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);