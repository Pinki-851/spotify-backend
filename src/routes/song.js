const express = require("express");
const router = express.Router();

const {
  createSong,
  updateSong,
  getAllSong,
  getSongByID,
  getSongByUserID,
  deleteSong,
} = require("../controller/songController");
const validateToken = require("../middlewares/validateToken");

router.post("/", createSong);
router.put("/:id", validateToken, updateSong);
router.delete("/:id", validateToken, deleteSong);
router.get("/", validateToken, deleteSong);
router.get("/:id", validateToken, getSongByID);
router.get("/:userid", validateToken, getSongByUserID);
module.exports = router;
