const express = require("express");
const router = express.Router();

require("dotenv").config();
const stripeAPI = process.env.STRIPE_API;

const stripe = require("stripe")(stripeAPI);

router.get("/customers", async (req, res) => {
  await stripe.customers.list({ limit: 10 }, (err, customers) => {
    console.log(customers);
  });
});

/// dealing with orders
router.get("/orders", async (req, res) => {
  await stripe.orders.list({ limit: 10 }, (err, orders) => {
    console.log(orders);
  });
});

router.post("/pay", async (req, res) => {
  await stripe.orders.pay(
    "or_1EupAEINLC12hJ7njNxw1V9S",
    {
      source: "tok_mastercard" // obtained with Stripe.js
    },
    (err, order) => {
      // asynchronously called
    }
  );
});

router.post("/update", async (req, res) => {
  await stripe.orders.update("or_1EupjDINLC12hJ7ne4pgkuYL", {
    status: "paid"
  });
});

router.post("/fullfill", async (req, res) => {
  await stripe.orders.update("or_1EupjDINLC12hJ7ne4pgkuYL", {
    status: "fulfilled",
    shipping: {
      carrier: "AUSPOST",
      tracking_number: "12431235346531"
    }
  });
});
