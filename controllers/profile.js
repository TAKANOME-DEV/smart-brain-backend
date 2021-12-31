const db = require("../db");

/**
 * @desc GET / Get User Profile
 * @route /profile/:id
 * @access Public
 */

exports.handleGetProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db("users").where({ id });

    if (user.length) return res.status(200).json(user[0]);
    else return res.status(404).json("User Not Found");
  } catch (err) {
    console.log(err);
    return res.status(400).json("Error Getting User");
  }
};
