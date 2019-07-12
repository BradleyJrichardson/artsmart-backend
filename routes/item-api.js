const Item = require("../models/Item");
const express = require("express");
const router = express.Router();

require("dotenv").config();
const stripeAPI = process.env.STRIPE_API;
const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");

// const seedItems = items => {
//   items.forEach(item => {
//     let {
//       title,
//       categories,
//       price,
//       description,
//       auto_process,
//       quantity,
//       images
//     } = item;
//     const newItem = new Item({
//       title: title,
//       categories: categories,
//       price: price,
//       description: description,
//       auto_process: auto_process,
//       quantity: quantity,
//       images: images
//     });
//     newItem.save();
//     if (newItem.save()) {
//       console.log("success 🤓");
//     } else {
//       console.log("failed 🤬");
//     }
//   });
// };

router.get("/seed", (req, res) => {
  createProduct();
});

const createProduct = async () => {
  await stripe.products.create(
    {
      name: "Teddies Quilt",
      type: "good"
    },
    (err, product) => {
      stripe.skus.create(
        {
          product: product.id,
          price: 15,
          currency: "aud",
          inventory: { type: "infinite" }
        },
        (err, sku) => {
          // put into the database here
          console.log(sku);
          const newItem = new Item({
            title: "Teddy bear",
            categories: ["BOM", "Quilts"],
            price: 15,
            description:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, enim sequi repellendus necessitatibus obcaecati quam quibusdam ducimus culpa temporibus tempora!",
            auto_process: false,
            images: ["urls", "urls"],
            product_id: product.id,
            sku: sku.id
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

createProduct();
module.exports = router;
