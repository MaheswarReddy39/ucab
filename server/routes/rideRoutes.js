  const express = require("express");

  const router = express.Router();

  const authMiddleware = require("../middleware/authMiddleware");
  const authorizeRoles = require("../middleware/roleMiddleware");

  const {
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
  } = require("../controllers/rideController");

  router.post(
    "/book",
    authMiddleware,
    authorizeRoles("user"),
    bookRide
  );
  router.get(
    "/my-rides",
    authMiddleware,
    authorizeRoles("user"),
    getMyRides
  );
  router.get(
    "/driver/history",
    authMiddleware,
    authorizeRoles("driver"),
    getDriverRides
  );
  router.get(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    getAllRides
  );
  router.get(
    "/:id",
    authMiddleware,
    getSingleRide
  );
  router.patch(
    "/cancel/:id",
    authMiddleware,
    authorizeRoles("user"),
    cancelRide
  );
  router.patch(
    "/accept/:id",
    authMiddleware,
    authorizeRoles("driver"),
    acceptRide
  );
  router.patch(
    "/start/:id",
    authMiddleware,
    authorizeRoles("driver"),
    startRide
  );
  router.patch(
    "/complete/:id",
    authMiddleware,
    authorizeRoles("driver"),
    completeRide
  );
  router.patch(
    "/reject/:id",
    authMiddleware,
    authorizeRoles("driver"),
    rejectRide
  );
  module.exports = router;
