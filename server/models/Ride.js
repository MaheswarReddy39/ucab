const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },
    cab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cab",
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    dropLocation: {
      type: String,
      required: true,
    },

    distance: {
      type: Number,
      required: true,
    },

    fare: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "started",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    rejectedDrivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
      },
    ],
    paymentMethod: {
  type: String,
  enum: ["Cash", "UPI", "Card"],
  default: "Cash",
},

paymentStatus: {
  type: String,
  enum: ["Pending", "Completed", "Failed"],
  default: "Pending",
},

transactionId: {
  type: String,
  default: "",
},
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ride", rideSchema);