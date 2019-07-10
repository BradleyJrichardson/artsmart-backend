const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  categories: { type: [String] },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  auto_process: {
    type: Boolean,
    required: true
  },
  quantity: {
    type: Number,
    required: false
  },
  images: { type: [String] }
});
module.exports = mongoose.model("item", itemSchema);
