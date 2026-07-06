  const express = require("express");

  const router = express.Router();

  const authMiddleware = require("../middleware/authMiddleware");

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
    bookRide
  );
  router.get(
    "/my-rides",
    authMiddleware,
    getMyRides
  );
  router.get(
    "/driver/history",
    authMiddleware,
    getDriverRides
  );
  router.get(
    "/",
    authMiddleware,
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
    cancelRide
  );
  router.patch(
    "/accept/:id",
    authMiddleware,
    acceptRide
  );
  router.patch(
    "/start/:id",
    authMiddleware,
    startRide
  );
  router.patch(
    "/complete/:id",
    authMiddleware,
    completeRide
  );
  router.patch(
    "/reject/:id",
    authMiddleware,
    rejectRide
  );
  module.exports = router;
