const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addCoupon,
  applyCoupon,
} = require("../controllers/couponController");

router.post(
  "/add",
  authMiddleware,
  addCoupon
);

router.post(
  "/apply",
  authMiddleware,
  applyCoupon
);

module.exports = router;