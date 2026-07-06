const express = require("express");

const router = express.Router();

const upload = require("../uploads/upload");

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
  upload.single("image"),
  addCab
);

router.get("/seed", seedCabs);

router.get("/", getAllCabs);

router.get("/:id", getSingleCab);

router.put("/:id", updateCab);

router.delete("/:id", deleteCab);

module.exports = router;