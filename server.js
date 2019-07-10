const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");
const app = new express();
const cors = require("cors");
require("dotenv").config();
const mongoURI = process.env.MONGO_PROD;

app.use(cors());
app.use(require("body-parser").text());
app.use(require("./routes"));

// defining some options to pass into connect
const options = {
  useNewUrlParser: true,
  family: 4
};

// database connection
mongoose
  .connect(mongoURI, options, err => {
    console.log("entered");
    if (err) {
      console.log(err);
      return;
    }
  })
  .then(() => {
    console.log("connected to mongoDB 🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿");
  });

// listen on port 5000
app.listen(5000, () => console.log("listening on port 5000"));
