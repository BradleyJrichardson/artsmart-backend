const express = require("express");
const router = express.Router();

router.use(express.json());

router.use("/store", require("./store-routes"));
router.use("/api", require("./item-api"));
router.use("/stripe", require("./stripe-api"));

// need to find a way to protect these routes
router.use("/dashboard", require("./stripe-dashboard"));
router.use("/auth", require("./auth-routes"));
router.use("/user", require("./user-routes"));

module.exports = router;
