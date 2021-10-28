const db = require("../db");

// @desc method: GET / Get Users
// @route /
// @access Public

exports.handleGetUsers = async (req, res) => {
  try {
    const users = await db("users");
    return res.json(users);
  } catch (err) {
    res.status(400).json("Something Went Wrong, Please Try Again");
    console.error(err);
  }
};
