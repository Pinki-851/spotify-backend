const { Song } = require("../model");

const createSong = async (req, res, next) => {
  try {
    const { name, track, thumbnail, artist, songs } = req.body;

    if (!name || !track || !thumbnail || !artist || !songs) {
      return res.status(400).send({ message: "Missing fields" });
    }

    const created_song = await Song.create({
      name,
      track,
      thumbnail,
      songs,
      artist: req.user.userId,
    });
    return res
      .status(200)
      .send({ message: "song created successfully", data: created_song });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};

const updateSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    const body = req.body;

    const found_Song = await Song.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!found_Song) {
      return res.status(400).send("not found");
    }
    if (found_Song.artist.toString() !== userId) {
      return res
        .status(400)
        .send("you are not autorized to perform this action");
    }
    await found_Song.save();
    return res
      .status(200)
      .json({ message: "updated successfully", song: found_Song });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};

const getSongByID = async (req, res, next) => {
  try {
    const id = req.params.userid;
    const userId = req.user.userId;

    const found_Song = await Song.findById({ _id: id });
    if (!found_Song) {
      return res.status(400).send("not found");
    }
    if (found_Song.artist.toString() !== userId) {
      return res
        .status(400)
        .send("you are not autorized to perform this action");
    }
    return res.status(200).json({ song: found_Song });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};
const getSongByUserID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;

    const found_Song = await Song.findById({ _id: id });
    if (!found_Song) {
      return res.status(400).send("not found");
    }
    if (found_Song.artist.toString() !== userId) {
      return res
        .status(400)
        .send("you are not autorized to perform this action");
    }
    return res.status(200).json({ song: found_Song });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};

const getAllSong = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const songs = await Song.find();
    return res.status(200).json({ songs });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    const found_song = await Song.findById({ _id: id });
    if (!found_song) {
      return res.status(400).send("not found");
    }
    if (found_song?.userId !== userId) {
      return res
        .status(400)
        .send("you are not autorized to perform this action");
    }

    const deletedSong = await Song.deleteOne({ _id: found_song._id });
    return res
      .status(200)
      .json({ message: "deleted successfully", song: deletedSong });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};
module.exports = {
  createSong,
  updateSong,
  getAllSong,
  getSongByID,
  getSongByUserID,
  deleteSong,
};
