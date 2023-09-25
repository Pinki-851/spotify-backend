const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");
const dotenv = require("dotenv");

const connectDB = require("./src/db/dbconnection");
dotenv.config();

const PORT = process.env.PORT;

// connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/song", require("./src/routes/song"));

app.use((req, res) => {
  res.status(400).send("sorry, cann't find that");
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listing on:", PORT);
});
