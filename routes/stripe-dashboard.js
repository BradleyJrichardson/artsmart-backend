const express = require("express");
const router = express.Router();
const orderObj = require("../models/Order");

require("dotenv").config();
const stripeAPI = process.env.STRIPE_API;

const stripe = require("stripe")(stripeAPI);

router.get("/customers", async (req, res) => {
  await stripe.customers.list((err, customers) => {
    res.status(200).send(customers);
  });
});

router.get("/orders", async (req, res) => {
  await stripe.orders.list((err, orders) => {
    res.status(200).send(orders);
  });
});

const findOrder = async order_id => {
  return orderObj.find({ order_id: order_id });
};

const removeOrder = async order_id => {
  return orderObj.deleteOne({ order_id: order_id });
};

router.post("/pay", async (req, res) => {
  let { order_id } = req.body.order;
  let foundOrderObj = await findOrder(order_id);
  let token = foundOrderObj[0].customer_token;

  await stripe.orders.pay(
    order_id,
    {
      source: token
    },
    (err, order) => {
      removeOrder(order_id);
      res.status(200).send(order);
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
    }
  );
});

router.post("/fullfill", async (req, res) => {
  let { order_id } = req.body.order;
  await stripe.orders.update(order_id, {
    status: "fulfilled",
    shipping: {
      carrier: "AUSPOST",
      tracking_number: "12431235346531"
    }
  });
});

router.post("/refund", async (req, res) => {
  console.log(req.body.order);
  let { order_id } = req.body.order;
  await stripe.orders.returnOrder(
    order_id,
    {
      items: [
        {
          type: "sku",
          parent: "sku_FSJYWe98c5ZbQZ"
        }
      ]
    },
    function(err, order) {}
  );
});

module.exports = router;
