const express = require("express");
const { createUser } = require("../controller/userController");
const router = express.Router();

router.route("/create-user").get(createUser);
module.exports = router;
