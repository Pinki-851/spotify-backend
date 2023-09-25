const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { ENV_VARIABLE } = require("../constants");

const validateToken = asyncHandler(async (req, res, next) => {
  console.log("token validator");
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, ENV_VARIABLE.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not authorized");
      }
      req.user = decoded.user;

      console.log("decode", decoded);
      next();
      if (!token) {
        res.status(401);
        throw new Error("token not valid");
      }
    });
  }
});

module.exports = validateToken;
