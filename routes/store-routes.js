const express = require("express");
const router = express.Router();
const { getItems } = require("../controllers/item-controller");

router.get("/index", getItems);

module.exports = router;
