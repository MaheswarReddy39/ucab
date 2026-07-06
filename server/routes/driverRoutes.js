const express = require("express");
const router = express.Router();

const {
  registerDriver,
  loginDriver,
  getDriverProfile,
  updateDriverProfile,
  toggleAvailability,
  updateDriverLocation,
  getNearbyDrivers,
} = require("../controllers/driverController");

const authMiddleware = require("../middleware/authMiddleware"); 

// Driver Register
router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.get("/profile", authMiddleware, getDriverProfile);
router.put(
    "/update-profile",
    authMiddleware,
    updateDriverProfile
);
router.patch(
  "/availability",
  authMiddleware,
  toggleAvailability
);
router.patch(
  "/location",
  authMiddleware,
  updateDriverLocation
);
router.get(
  "/nearby",
  authMiddleware,
  getNearbyDrivers
);

module.exports = router;