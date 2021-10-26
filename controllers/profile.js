const db = require("../db");

// @desc GET / Get User Profile
// @route /profile/:id
// @access Public

exports.handleGetProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await db("users")
      .where({ id })
      .then((user) => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("User Not Found");
        }
      });
  } catch (err) {
    res.status(400).json("Error Getting User");
    console.error(err);
  }
};
