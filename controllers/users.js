const db = require("../db");
const bcrypt = require("bcryptjs");

// @desc method: GET / Get Users
// @route /users
// @access Public

exports.handleGetUsers = async (req, res) => {
  try {
    await db("users").then((users) => res.json(users));
  } catch (err) {
    res.status(400).json("Something Went Wrong");
  }
};
