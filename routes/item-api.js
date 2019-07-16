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
      name: "Life is good",
      type: "good",
      description: "here goes a little description"
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
            title: "Life is good",
            categories: ["hand painted"],
            price: 30,
            description:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, enim sequi repellendus necessitatibus obcaecati quam quibusdam ducimus culpa temporibus tempora!",
            auto_process: false,
            images: ["urls", "urls"],
            product_id: product.id,
            sku: sku.id,
            package_dimensions: sku.package_dimensions
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
