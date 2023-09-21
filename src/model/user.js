const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    likedSongs: { type: String },
    likedPlaylists: { type: String },
    subscribedArtists: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);
