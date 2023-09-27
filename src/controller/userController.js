const { User } = require("../model");
const jwt = require("jsonwebtoken");
const generateUniqueId = require("../utils/generateId");

const createUser = async (req, res, next) => {
  try {
    const { firstname, lastname, username, password, email } = req.body;

    if (!firstname || !lastname || !username || !password || !email) {
      return res.status(400).send({ message: "missing fields", status: 400 });
    }
    const existing_user = await User.findOne({ email });

    if (existing_user) {
      return res.status(400).send({ message: "User alreay exist" });
    }

    let uniqueId = generateUniqueId();

    const user_with_id = await User.findOne({ usserId: uniqueId });

    while (user_with_id) {
      uniqueId = generateUniqueId();
      user_with_id = await User.findOne({ usserId: uniqueId });
    }

    const new_pass = await bcrypt.hash(password, 10);

    const payload = { email, userId: uniqueId };
    const accessToken = jwt.sign(
      { data: payload },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const finalUser = await User.create({
      email,
      firstname,
      lastname,
      password: new_pass,
      token: accessToken,
      userId: uniqueId,
    });
    return res.status(200).send({ message: "user created", data: finalUser });
  } catch (error) {
    throw new Error(error.message);
  }
};

const userLogin = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("please send payload");
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("missing fields");
    }
    const found_user = await User.findOne({ email });
    if (!found_user) {
      return res.status(400).send("no such user found");
    }
    const check_pass = await bcrypt.compare(password, user.password);
    if (!check_pass) {
      return res
        .status(400)
        .json({ message: "Invalid credential please try again" });
    }

    return res
      .status(200)
      .send({ data: found_user, message: "Login successfull" });
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const body = req.body;
    const user_id = req.params.id;
    const found_user = await User.findByIdAndUpdate({ userId: user_id }, body, {
      new: true,
    });

    if (!found_user) {
      return res.status(400).send("no such user found");
    }

    if (found_user.userId !== user_id) {
      return res
        .status(400)
        .send("you are not autorized to perform this action");
    }

    const updatedUser = await found_user.save();

    return res
      .status(200)
      .json({ message: "user updated successfully", data: updatedUser });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const found_user = await User.findById({ userId: user_id });

    if (!found_user) {
      return res.status(400).send("no such user found");
    }

    if (found_user.userId !== user_id) {
      return res
        .status(400)
        .send("you are not autorized to perform this action");
    }

    const deletedUser = await found_user.deleteOne();

    return res
      .status(200)
      .json({ message: "user deleted successfully", data: deletedUser });
  } catch (error) {
    next(error);
    throw new Error(error);
  }
};

module.exports = { createUser, userLogin, updateUser, deleteUser };
