const Driver = require("../models/Driver");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Register Driver
const registerDriver = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      vehicleType,
      vehicleNumber,
    } = req.body;

    // Check Empty Fields
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !vehicleType ||
      !vehicleNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate Email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Check Existing Driver
    const existingDriver = await Driver.findOne({
      $or: [
        { email },
        { phone },
        { vehicleNumber }
      ]
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "Driver already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Driver
    const driver = await Driver.create({
      name,
      email,
      phone,
      password: hashedPassword,
      vehicleType,
      vehicleNumber,
    });

    res.status(201).json({
      success: true,
      message: "Driver Registered Successfully",
      driver,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: driver._id,
        role: "driver",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Driver Login Successful",
      token,
      driver,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findById(req.user.id).select("-password");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      driver,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateDriverProfile = async (req, res) => {
  try {

    const driver = await Driver.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Driver Profile Updated Successfully",
      driver
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const toggleAvailability = async (req, res) => {
  try {

    const driver = await Driver.findById(req.user.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    driver.isAvailable = !driver.isAvailable;

    await driver.save();

    res.status(200).json({
      success: true,
      message: `Driver is now ${
        driver.isAvailable ? "Online" : "Offline"
      }`,
      driver,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const updateDriverLocation = async (req, res) => {
  try {

    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const driver = await Driver.findByIdAndUpdate(
      req.user.id,
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Location Updated Successfully",
      driver,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};  
const getNearbyDrivers = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const drivers = await Driver.find({
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
          $maxDistance: parseInt(radius),
        },
      },
    }).select("-password");

    res.status(200).json({
      success: true,
      totalDrivers: drivers.length,
      drivers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  registerDriver,
  loginDriver,
  getDriverProfile,
  updateDriverProfile,
  toggleAvailability,
  updateDriverLocation,
  getNearbyDrivers,
};