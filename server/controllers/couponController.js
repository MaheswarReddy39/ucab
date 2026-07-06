const Coupon = require("../models/Coupon");
const Ride = require("../models/Ride");

// Add Coupon
const addCoupon = async (req, res) => {
  try {

    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon Added Successfully",
      coupon,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Apply Coupon
const applyCoupon = async (req, res) => {
  try {

    const { rideId, code } = req.body;

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid Coupon",
      });
    }

    if (ride.fare < coupon.minFare) {
      return res.status(400).json({
        success: false,
        message: "Minimum fare not reached",
      });
    }

    const discountAmount =
      (ride.fare * coupon.discount) / 100;

    const finalFare =
      ride.fare - discountAmount;

    res.status(200).json({
      success: true,
      originalFare: ride.fare,
      discount: coupon.discount,
      discountAmount,
      finalFare,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addCoupon,
  applyCoupon,
};