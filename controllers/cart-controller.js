const cart = require("../models/Cart");

const createCart = async (req, res) => {
  console.log(req.body);
  // const newCart = new Cart({});

  // if (newCart.save()) {
  //   console.log("success saving cart 🛒");
  // } else {
  //   console.log("failed 🤬");
  // }
  // res.status(200);
};

const getCart = async (req, res) => {
  console.log(req.body);
  const theirCart = await cart.find({ JWT: req.body });
  res.status(200).send(theirCart);
};

module.exports = {
  getCart,
  createCart
};

// JWT: {
//   type: String,
//   required: true
// },
// items: [
//   {
//     price: { type: String, required: true },
//     product_id: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     sku: { type: String, required: true },
//     title: { type: String, required: true },
//     totalPrice: { type: Number, required: true }
//   }
// ]
