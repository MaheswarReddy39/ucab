const Ride = require("../models/Ride");
const Driver = require("../models/Driver");
const Cab = require("../models/Cab");

const bookRide = async (req, res) => {
  try {

    const {
      pickupLocation,
      dropLocation,
      distance,
      cab,
      latitude,
      longitude,
    } = req.body;

    if (
      !pickupLocation ||
      !dropLocation ||
      !distance ||
      !cab ||
      latitude == null ||
      longitude == null
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const selectedCab = await Cab.findById(cab);

    if (!selectedCab) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    const fare =
      selectedCab.baseFare +
      distance * selectedCab.farePerKm;

    // Estimated Arrival Time (ETA)
    const averageSpeed = 40; // km/h
    const estimatedMinutes = Math.ceil(
      (distance / averageSpeed) * 60
    );

    const nearestDriver = await Driver.findOne({
      isAvailable: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(longitude),
              parseFloat(latitude),
            ],
          },
          $maxDistance: 5000,
        },
      },
    });

    const ride = await Ride.create({
      user: req.user.id,
      driver: nearestDriver ? nearestDriver._id : null,
      cab,
      pickupLocation,
      dropLocation,
      distance,
      fare,
      status: nearestDriver ? "accepted" : "pending",
    });

    res.status(201).json({
      success: true,
      message: nearestDriver
        ? "Driver Assigned Successfully"
        : "No Nearby Driver Found",
      fare,
      estimatedArrival: `${estimatedMinutes} mins`,
      ride,
      assignedDriver: nearestDriver,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getMyRides = async (req, res) => {
  try {

    const rides = await Ride.find({
      user: req.user.id,
    })
      .populate("driver", "name phone vehicleType vehicleNumber")
      .populate("cab", "name vehicleType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalRides: rides.length,
      rides,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const cancelRide = async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (ride.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Ride cannot be cancelled",
      });
    }

    ride.status = "cancelled";

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride Cancelled Successfully",
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const acceptRide = async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Ride already accepted or completed",
      });
    }
    console.log(req.user);
    console.log("Driver ID:", req.user.id);
    ride.driver = req.user.id;
    console.log("Ride Driver:", ride.driver);
    ride.status = "accepted";

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride Accepted Successfully",
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const startRide = async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Only accepted rides can be started",
      });
    }

    ride.status = "started";

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride Started Successfully",
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const completeRide = async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.status !== "started") {
      return res.status(400).json({
        success: false,
        message: "Only started rides can be completed",
      });
    }

    ride.status = "completed";

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride Completed Successfully",
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const rejectRide = async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Current driver ni rejected list lo add cheyyi
    ride.rejectedDrivers.push(req.user.id);

    // Vere available driver ni search cheyyi
    const nextDriver = await Driver.findOne({
      isAvailable: true,
      _id: {
        $nin: ride.rejectedDrivers,
      },
    });

    if (nextDriver) {

      ride.driver = nextDriver._id;
      ride.status = "accepted";

      await ride.save();

      return res.status(200).json({
        success: true,
        message: "Ride Assigned To Next Driver",
        driver: nextDriver,
      });

    }

    // Evaru dorakkapothe
    ride.driver = null;
    ride.status = "pending";

    await ride.save();

    res.status(200).json({
      success: true,
      message: "No Driver Available. Ride Pending",
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getSingleRide = async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("driver", "name phone vehicleType vehicleNumber");

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    res.status(200).json({
      success: true,
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getDriverRides = async (req, res) => {
  try {

    const rides = await Ride.find({
      driver: req.user.id,
    })
      .populate("user", "name email phone")
      .populate("cab", "name vehicleType");

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
const getAllRides = async (req, res) => {
  try {

    const rides = await Ride.find()
      .populate("user", "name email")
      .populate("driver", "name")
      .populate("cab", "name vehicleType")
      .sort({ createdAt: -1 });

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
  bookRide,
  getMyRides,
  cancelRide,
  acceptRide,
  startRide,
  completeRide,
  rejectRide,
  getSingleRide,
  getDriverRides,
  getAllRides,
};