const Item = require("../models/Item");
const express = require("express");
const router = express.Router();

require("dotenv").config();
const stripeAPI = process.env.STRIPE_API;

const stripe = require("stripe")(stripeAPI);

const items = [
  {
    title: "title1",
    categories: ["strings", "here"],
    price: 6969,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt aliquid unde ipsa, praesentium quia maxime et doloribus exercitationem totam assumenda!",
    auto_process: false,
    quantity: 54,
    images: ["urls from cloudinary", "urls from cloudinary"]
  },
  {
    title: "title2",
    categories: ["strings", "here"],
    price: 6969,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt aliquid unde ipsa, praesentium quia maxime et doloribus exercitationem totam assumenda!",
    auto_process: false,
    quantity: 54,
    images: ["urls from cloudinary", "urls from cloudinary"]
  },
  {
    title: "title3",
    categories: ["strings", "here"],
    price: 6969,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt aliquid unde ipsa, praesentium quia maxime et doloribus exercitationem totam assumenda!",
    auto_process: false,
    quantity: 54,
    images: ["urls from cloudinary", "urls from cloudinary"]
  },
  {
    title: "title4",
    categories: ["strings", "here"],
    price: 6969,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt aliquid unde ipsa, praesentium quia maxime et doloribus exercitationem totam assumenda!",
    auto_process: false,
    quantity: 54,
    images: ["urls from cloudinary", "urls from cloudinary"]
  }
];

const seedItems = items => {
  items.forEach(item => {
    let {
      title,
      categories,
      price,
      description,
      auto_process,
      quantity,
      images
    } = item;
    const newItem = new Item({
      title: title,
      categories: categories,
      price: price,
      description: description,
      auto_process: auto_process,
      quantity: quantity,
      images: images
    });
    if (newItem.save()) {
      console.log("success 🤓");
    } else {
      console.log("failed 🤬");
    }
  });
};

router.get("/seed", (req, res) => {
  seedItems(items);
});

const createProduct = () => {
  stripe.products.create(
    {
      name: "T-shirt",
      type: "good"
    },
    (err, product) => {
      console.log(product);
      stripe.skus.create(
        {
          product: product.id,
          price: 1500,
          currency: "aud",
          inventory: { type: "infinite" }
        },
        (err, sku) => {
          console.log(sku);
        }
      );
    }
  );
};
createProduct;

module.exports = router;
