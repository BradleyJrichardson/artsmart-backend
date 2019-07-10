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
  const { email } = req.body.order;
  const { name } = req.body.order.shipping;

  try {
    let stripeCustomer = null;
    const stripeOrder = await stripe.orders.create(order);

    stripe.customers.retrieve("cus_FPNB4FFp7v481M", async (err, customer) => {
      stripeCustomer = customer;
      if (stripeCustomer === null) {
        stripeCustomer = await stripe.customers.create({
          email: email,
          description: name,
          source: source
        });
        console.log(`Customer created: ${stripeCustomer.description}`);
      }
    });

    console.log(`Order created: ${stripeOrder.id}`);
  } catch (err) {
    console.log(`Order error: ${err}`);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

module.exports = router;
