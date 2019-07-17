const orderItem = require("../models/Item");
const express = require("express");
const router = express.Router();

require("dotenv").config();
const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");

router.get("/seed", (req, res) => {
  createProduct();
});

const createProduct = async () => {
  await stripe.products.create(
    {
      name: "not new",
      type: "good",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, quis."
    },
    (err, product) => {
      stripe.skus.create(
        {
          product: product.id,
          price: 15,
          currency: "aud",
          inventory: { type: "infinite" },
          package_dimensions: {
            height: 8,
            length: 4,
            weight: 4,
            width: 2
          }
        },
        (err, sku) => {
          // put into the database here
          console.log(sku);
          const newItem = new orderItem({
            title: "Christmas",
            categories: ["Christmas"],
            price: 500,
            description:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, enim sequi repellendus necessitatibus obcaecati quam quibusdam ducimus culpa temporibus tempora!",
            auto_process: false,
            images: ["urls", "urls"],
            product_id: product.id,
            sku: sku.id,
            new: false
          });
          if (newItem.save()) {
            console.log("success 🤓");
          } else {
            console.log("failed 🤬");
          }
        }
      );
    }
  );
};

module.exports = router;
