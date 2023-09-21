const createUser = async (req, res, next) => {
  try {
    // const {} = req.body;
    res.status(200).send("user created");
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };
