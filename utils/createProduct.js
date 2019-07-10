const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");

const createProduct = () => {
  stripe.products.create(
    {
      name: "T-shirt",
      type: "good"
    },
    function(err, product) {
      console.log(product);
      stripe.skus.create(
        {
          product: product.id,
          price: 1500,
          currency: "aud",
          inventory: { type: "infinite" }
        },
        function(err, sku) {
          console.log(sku);
        }
      );
    }
  );
};

createProduct;
