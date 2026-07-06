const Ride = require("../models/Ride");

// Create Payment
const createPayment = async (req, res) => {
  try {

    const { rideId, paymentMethod } = req.body;

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    ride.paymentMethod = paymentMethod;
    ride.paymentStatus = "Completed";
    ride.transactionId =
      "TXN" + Date.now();

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Payment Successful",
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Payment History
const paymentHistory = async (req, res) => {
  try {

    const rides = await Ride.find({
      paymentStatus: "Completed",
    });

    res.status(200).json({
      success: true,
      total: rides.length,
      rides,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createPayment,
  paymentHistory,
};