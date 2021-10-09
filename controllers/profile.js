const db = require("../db");

// @desc GET / Get User Profile
// @route /profile/:id
// @access Public

exports.handleGetProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await db("users")
      .where({ id })
      .then((user) => res.json(user[0]));
  } catch (err) {
    res.status(400).json("Something Went Wrong");
    console.error(err);
  }
};
