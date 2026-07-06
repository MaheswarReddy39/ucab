const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const driverRoutes = require("./driverRoutes");
const rideRoutes = require("./rideRoutes");
const cabRoutes = require("./cabRoutes");
const paymentRoutes = require("./paymentRoutes");
const notificationRoutes = require("./notificationRoutes");
const adminRoutes = require("./adminRoutes");
const couponRoutes = require("./couponRoutes");

// Test Route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UCab Backend API Working Successfully 🚖",
  });
});

// Auth Routes
router.use("/api/auth", authRoutes);
router.use("/api/drivers", driverRoutes);
router.use("/api/rides", rideRoutes);
router.use("/api/cabs", cabRoutes);
router.use("/api/payment", paymentRoutes);
router.use("/api/notifications", notificationRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/coupons", couponRoutes);

module.exports = router;