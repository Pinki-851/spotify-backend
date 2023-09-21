// name,artist:{type:mongoose.Types.Object,ref:"User"},track,thumbnail,size,
// playlist:name,thumbnail,songs,owner,collabrator
const mongoose = require("mongoose");

const song = new mongoose.Schema(
  {
    name: { type: String, default: "", required: true },
    songs: [{ type: String, required: true }],
    track: { type: String, default: "", required: true },
    thumbnail: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", song);
