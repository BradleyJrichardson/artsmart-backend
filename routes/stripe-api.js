const express = require("express");
const router = express.Router();

require("dotenv").config();
const stripeAPI = process.env.STRIPE_API;

const stripe = require("stripe")(stripeAPI);
router.post("/order", async (req, res) => {
  const order = req.body.order;
  console.log(order);
  const source = req.body.source;
  const { email } = req.body.order;
  const { name } = req.body.order.shipping;

  try {
    let newCustomer;
    let existingCustomer = await stripe.customers.list({ email: email });

    if (existingCustomer.data.length) {
      console.log("customer exists!");
    } else {
      newCustomer = await stripe.customers.create({
        email: email,
        description: name,
        source: source
      });
      console.log(`Customer created: ${newCustomer.description}`);
    }

    if (existingCustomer.data.length) {
      console.log("here");
      order.customer = existingCustomer.data[0].id;
    } else {
      order.customer = newCustomer.id;
    }
    const stripeOrder = await stripe.orders.create(order);
    console.log(order);
    console.log(`Order created: ${stripeOrder.id}`);
  } catch (err) {
    console.log(`Order error: ${err}`);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

module.exports = router;
