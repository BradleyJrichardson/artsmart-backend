const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
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
  images: { type: [String] },
  product_id: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("order_item", orderItemSchema);
