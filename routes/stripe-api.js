const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");

/// https://stripe.com/docs/recipes/elements-react

/// create a customer
//stripe.com/docs/api/customers

/// create an order
router.post("/order", async (req, res) => {
  const order = req.body.order;
  const source = req.body.source;
  // source is the card token put the order in database with token?
  try {
    const stripeOrder = await stripe.orders.create(order);
    console.log(`Order created: ${stripeOrder.id}`);
  } catch (err) {
    console.log(`Order error: ${err}`);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

module.exports = router;

// const makeUser = items => {
//   const newUser = new User({
//     details: TODO
//   });
//   if (newUser.save()) {
//     console.log("success 🤓");
//   } else {
//     console.log("failed 🤬");
//   }
// };
/// check if user exists
// const checkMushroom = async () => {
//   try {
//     const query = await Mushroom.findOne({ binomial_name: bionomial });
//     if (query === null) {
//       const mushroom = await makeMushroom();
//       console.log("success");
//       console.log(mushroom);
//     } else {
//       console.log("mushroom exists");
//     }
//   } catch (err) {
//     console.log(err);
//     console.log("fail");
//   }
// };
