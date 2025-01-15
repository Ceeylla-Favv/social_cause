const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contributionSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    causeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cause",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const contributionModel = model("Contribution", contributionSchema);

module.exports = contributionModel;
