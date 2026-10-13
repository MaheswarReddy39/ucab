const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("admin"),
  getDashboard
);
router.get(
  "/users",
  authMiddleware,
  authorizeRoles("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;