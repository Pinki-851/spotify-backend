const mongoose = require("mongoose");

const playList = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    songs: [{ type: mongoose.Types.ObjectId, ref: "song" }],
    owner: { type: mongoose.Types.ObjectId, ref: "user" },
    thumbnail: {
      type: String,
    },
    collaborater: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playList);
