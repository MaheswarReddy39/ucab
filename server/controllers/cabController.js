const Cab = require("../models/Cab");

// Add Cab
const addCab = async (req, res) => {
  try {

    const cab = await Cab.create({
      driverName: req.body.driverName,
      name: req.body.name,
      vehicleType: req.body.vehicleType,
      carNumber: req.body.carNumber,
      capacity: req.body.capacity,
      baseFare: req.body.baseFare,
      farePerKm: req.body.farePerKm,
      image: req.file
        ? req.file.filename
        : "",
    });

    res.status(201).json({
      success: true,
      message: "Cab Added Successfully",
      cab,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Cabs
const getAllCabs = async (req, res) => {
  try {
    const cabs = await Cab.find();

    res.status(200).json({
      success: true,
      total: cabs.length,
      cabs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Cab
const getSingleCab = async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);

    if (!cab) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    res.status(200).json({
      success: true,
      cab,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Cab
const updateCab = async (req, res) => {
  try {
    const cab = await Cab.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cab) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cab Updated Successfully",
      cab,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Cab
const deleteCab = async (req, res) => {
  try {
    const cab = await Cab.findByIdAndDelete(req.params.id);

    if (!cab) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cab Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Seed Cabs
const seedCabs = async (req, res) => {
  try {
    await Cab.deleteMany();

    const cabs = [
      {
        name: "Mini Cab",
        vehicleType: "Mini",
        capacity: 4,
        baseFare: 50,
        farePerKm: 12,
        image:
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600",
      },
      {
        name: "Sedan",
        vehicleType: "Sedan",
        capacity: 4,
        baseFare: 80,
        farePerKm: 15,
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
      },
      {
        name: "SUV",
        vehicleType: "SUV",
        capacity: 6,
        baseFare: 120,
        farePerKm: 20,
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
      },
      {
        name: "Innova",
        vehicleType: "SUV",
        capacity: 7,
        baseFare: 150,
        farePerKm: 22,
        image:
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600",
      },
      {
        name: "Swift Dzire",
        vehicleType: "Sedan",
        capacity: 4,
        baseFare: 90,
        farePerKm: 16,
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
      },
      {
        name: "Ertiga",
        vehicleType: "SUV",
        capacity: 7,
        baseFare: 130,
        farePerKm: 19,
        image:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600",
      },
      {
        name: "XUV700",
        vehicleType: "SUV",
        capacity: 7,
        baseFare: 180,
        farePerKm: 25,
        image:
          "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600",
      },
      {
        name: "WagonR",
        vehicleType: "Mini",
        capacity: 4,
        baseFare: 60,
        farePerKm: 13,
        image:
          "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=600",
      },
    ];

    await Cab.insertMany(cabs);

    res.status(201).json({
      success: true,
      message: "8 Cabs Inserted Successfully",
      total: cabs.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCab,
  getAllCabs,
  getSingleCab,
  updateCab,
  deleteCab,
  seedCabs,
};