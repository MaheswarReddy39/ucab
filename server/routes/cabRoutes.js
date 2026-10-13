const express = require("express");

const router = express.Router();

const upload = require("../uploads/upload");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  addCab,
  getAllCabs,
  getSingleCab,
  updateCab,
  deleteCab,
  seedCabs,
} = require("../controllers/cabController");

router.post(
  "/add",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("image"),
  addCab
);

router.get("/seed", authMiddleware, authorizeRoles("admin"), seedCabs);

router.get("/", getAllCabs);

router.get("/:id", getSingleCab);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("image"),
  updateCab
);

router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteCab);

module.exports = router;