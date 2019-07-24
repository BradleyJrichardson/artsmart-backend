const express = require("express");
const app = new express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(require("body-parser").text());
app.use(require("./routes"));

app.get("/", (req, res) => {
  res.send("api working");
});

module.exports = app;
