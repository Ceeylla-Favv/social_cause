const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const causeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const causeModel = model("Cause", causeSchema);

module.exports = causeModel;
