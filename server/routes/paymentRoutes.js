const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPayment,
  paymentHistory,
} = require("../controllers/paymentController");

router.post(
  "/pay",
  authMiddleware,
  createPayment
);

router.get(
  "/history",
  authMiddleware,
  paymentHistory
);

module.exports = router;