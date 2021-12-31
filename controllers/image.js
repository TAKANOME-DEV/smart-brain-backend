const db = require("../db");

/**
 * @desc PUT / Update User Entries
 * @route /image
 * @access Public
 */

exports.handleUpdateEntries = async (req, res) => {
  try {
    const { id } = req.body;

    const entry = await db("users")
      .where({ id })
      .increment("entries")
      .returning("entries");
    return res.json(entry[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};
