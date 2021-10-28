const db = require("../db");

// @desc method: DELETE / Delete User
// @route /delete/:id
// @access Public

exports.handleDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.transaction(async (trx) => {
      const user = await trx("users").where({ id });

      if (user.length) {
        const delIntoUsers = await trx("users")
          .where({ id })
          .returning("*")
          .del();
        await trx("login").where({ id }).returning("*").del();
        return res.json(delIntoUsers);
      } else {
        return res.status(404).json("User Not Found");
      }
    });
  } catch (err) {
    res.status(400).json("Something Went Wrong");
    console.error(err);
  }
};
