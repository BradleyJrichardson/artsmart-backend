const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");

router.post("/order", async (req, res) => {
  const order = req.body.order;
  const source = req.body.source;
  const { email } = req.body.order;
  const { name } = req.body.order.shipping;
  console.log(name);

  try {
    let stripeCustomer;
    const stripeOrder = await stripe.orders.create(order);
    let existingCustomers = await stripe.customers.list({ email: email });
    if (existingCustomers.data.length) {
      console.log("customer exists!");
    } else {
      let stripeCustomer = await stripe.customers.create({
        email: email,
        description: name,
        source: source
      });
      console.log(`Customer created: ${stripeCustomer.description}`);
    }

    console.log(`Order created: ${stripeOrder.id}`);
  } catch (err) {
    console.log(`Order error: ${err}`);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

module.exports = router;
