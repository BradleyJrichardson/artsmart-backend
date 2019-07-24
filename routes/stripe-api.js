const express = require("express");
const router = express.Router();
const orderObj = require("../models/Order");
require("dotenv").config();
const stripeAPI = process.env.STRIPE_API;

const stripe = require("stripe")(stripeAPI);
router.post("/order", async (req, res) => {
  const order = req.body.order;
  const source = req.body.source;
  const { email } = req.body.order;
  const { name, phone, address } = req.body.order.shipping;
  console.log(req.body);
  try {
    let newCustomer;
    let existingCustomer = await stripe.customers.list({ email: email });

    if (existingCustomer.data.length) {
      console.log("customer exists!");
    } else {
      newCustomer = await stripe.customers.create({
        email: email,
        name: name,
        source: source,
        phone: phone,
        address: address
      });
      console.log(`Customer created: ${newCustomer.name}`);
    }

    if (existingCustomer.data.length) {
      console.log("here");
      order.customer = existingCustomer.data[0].id;
    } else {
      order.customer = newCustomer.id;
    }
    const stripeOrder = await stripe.orders.create(order);

    // create a order in our database with
    let customerId = order.customer;
    let orderToken = source;
    let orderId = stripeOrder.id;
    /// its actually an order token as it changes for each order so will have to create an order
    /// model and use that to pull the token out? need order_id, Cust_id, and token
    const Order = new orderObj({
      customer_id: customerId,
      order_token: orderToken,
      order_id: orderId
    });
    if (Order.save()) {
      console.log("OrderObj created");
    } else {
      console.log("failed 🤬");
    }
    console.log(`Order created: ${stripeOrder.id}`);
  } catch (err) {
    console.log(`Order error: ${err}`);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

module.exports = router;
