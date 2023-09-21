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

app.use("/api/users", require("./src/routes/userRoute"));

app.use((req, res) => {
  res.status(400).send("sorry, cann't find that");
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listing on:", PORT);
});
