const express = require("express");
const app = express();
const { user } = require("./src/model");

app.get("/", (req, res) => {
  res.send("api connected");
});
