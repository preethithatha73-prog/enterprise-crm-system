const mongoose = require("mongoose");

const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Closed"];

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "New",
    },
    value: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ name: "text", company: "text" });

leadSchema.statics.STATUSES = LEAD_STATUSES;

module.exports = mongoose.model("Lead", leadSchema);
