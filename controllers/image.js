const db = require("../db");

// @desc PUT / Update User Entries
// @route /image
// @access Public

exports.handleUpdateEntries = async (req, res) => {
  try {
    const { id } = req.body;

    await db("users")
      .where({ id })
      .returning("entries")
      .increment("entries")
      .then((entry) => res.json(parseInt(entry[0])));
  } catch (err) {
    res.status(400).json("Something Went Wrong");
    console.error(err);
  }
};
