const express = require("express");
const {
  createUser,
  userLogin,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.post("/create-user", createUser);
router.post("/login", userLogin);
router.put("/:id", validateToken, updateUser);
router.delete("/:id", validateToken, deleteUser);
module.exports = router;
