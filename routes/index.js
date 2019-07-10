const express = require("express");
const router = express.Router();

router.use(express.json());

router.use("/store", require("./store-routes"));
router.use("/api", require("./item-api"));
router.use("/stripe", require("./stripe-api"));

module.exports = router;
