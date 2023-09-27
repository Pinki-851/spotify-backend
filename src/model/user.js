const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true },
    likedSongs: { type: String },
    likedPlaylists: { type: String },
    subscribedArtists: { type: String },
    code: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
