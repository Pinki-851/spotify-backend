const mongoose = require("mongoose");
const { ENV_VARIABLE } = require("../constants");

const connectDB = async () => {
  // console.log("connect");
  try {
    // console.log("try", process.env.MONGO_URL);
    const connect = await mongoose.connect(ENV_VARIABLE.MONGO_URL);
    // console.log("after try");
    console.log("connect", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
};

module.exports = connectDB;
