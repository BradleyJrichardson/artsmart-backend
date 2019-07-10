const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  given_name: {
    type: Number,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    required: true
  },
  street_address: {
    type: String,
    required: true
  },
  surburb: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  post_code: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  stripe_token: {
    type: String,
    required: false
  }
});
module.exports = mongoose.model("user", userSchema);
