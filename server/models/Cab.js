const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema(
  {
    driverName: {
      type: String,
      default: "",
    },

    carNumber: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: ["Bike", "Auto", "Mini", "Sedan", "SUV", "MUV"],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    baseFare: {
      type: Number,
      required: true,
    },

    farePerKm: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Cab", cabSchema);