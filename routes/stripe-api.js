const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");

router.post("/order", async (req, res) => {
  const order = req.body.order;
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

const processOrder = async () => {
  await stripe.orders.pay(
    "or_1EupAEINLC12hJ7njNxw1V9S",
    {
      source: "tok_mastercard" // obtained with Stripe.js
    },
    function(err, order) {
      // asynchronously called
    }
  );

  await stripe.orders.update("or_1EupjDINLC12hJ7ne4pgkuYL", {
    status: "paid"
    // shipping: {
    //   carrier: "AUSPOST",
    //   tracking_number: "12431235346531"
    // }
  });
};

module.exports = router;
