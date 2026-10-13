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
const authorizeRoles = require("../middleware/roleMiddleware");

// Driver Register
router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.get("/profile", authMiddleware, authorizeRoles("driver"), getDriverProfile);
router.put(
    "/update-profile",
    authMiddleware,
    authorizeRoles("driver"),
    updateDriverProfile
);
router.patch(
  "/availability",
  authMiddleware,
  authorizeRoles("driver"),
  toggleAvailability
);
router.patch(
  "/location",
  authMiddleware,
  authorizeRoles("driver"),
  updateDriverLocation
);
router.get(
  "/nearby",
  authMiddleware,
  getNearbyDrivers
);

module.exports = router;