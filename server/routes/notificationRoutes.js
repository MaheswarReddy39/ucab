const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.post(
  "/send",
  authMiddleware,
  sendNotification
);

router.get(
  "/",
  authMiddleware,
  getNotifications
);

router.put(
  "/read/:id",
  authMiddleware,
  markAsRead
);

router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

module.exports = router;