const User = require("../models/User");
const Driver = require("../models/Driver");
const Ride = require("../models/Ride");
const Cab = require("../models/Cab");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDrivers = await Driver.countDocuments();

    const totalCabs = await Cab.countDocuments();

    const totalRides = await Ride.countDocuments();

    const completedRides = await Ride.countDocuments({
      status: "completed",
    });

    const cancelledRides = await Ride.countDocuments({
      status: "cancelled",
    });

    const ongoingRides = await Ride.countDocuments({
      status: {
        $in: ["accepted", "started"],
      },
    });

    const revenue = await Ride.aggregate([
      {
        $match: {
          paymentStatus: "Completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$fare",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalDrivers,
        totalCabs,
        totalRides,
        completedRides,
        cancelledRides,
        ongoingRides,
        totalRevenue:
          revenue.length > 0
            ? revenue[0].totalRevenue
            : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Users
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboard,
  getAllUsers,
  deleteUser,
};