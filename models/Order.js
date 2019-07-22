const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true
  },
  order_token: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("order", orderSchema);
