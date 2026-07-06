const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDashboard,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);
router.get(
  "/users",
  authMiddleware,
  getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  deleteUser
);

module.exports = router;