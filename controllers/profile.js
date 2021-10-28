const db = require("../db");

// @desc GET / Get User Profile
// @route /profile/:id
// @access Public

exports.handleGetProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db("users").where({ id });

    if (user.length) {
      res.status(200).json(user[0]);
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (err) {
    res.status(400).json("Error Getting User");
    console.error(err);
  }
};
